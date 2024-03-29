const e10 = Math.sqrt(50)
const e5 = Math.sqrt(10)
const e2 = Math.sqrt(2)

export const default_x = (d) => d.x
export const default_y = (d) => d.y

export function get_ticks(start, stop, count = 5) {
  var reverse
  var i = -1
  var n
  var ticks
  var step

  if (start === stop && count > 0) return [start]

  if ((reverse = stop < start)) {
    ;[start, stop] = [stop, start]
  }

  if ((step = increment(start, stop, count)) === 0 || !isFinite(step)) {
    return []
  }

  if (step > 0) {
    start = Math.ceil(start / step)
    stop = Math.floor(stop / step)
    ticks = new Array((n = Math.ceil(stop - start + 1)))
    while (++i < n) ticks[i] = (start + i) * step
  } else {
    start = Math.floor(start * step)
    stop = Math.ceil(stop * step)
    ticks = new Array((n = Math.ceil(start - stop + 1)))
    while (++i < n) ticks[i] = (start - i) / step
  }

  if (reverse) ticks.reverse()

  return ticks
}

function increment(start, stop, count) {
  const step = (stop - start) / Math.max(0, count)
  const power = Math.floor(Math.log(step) / Math.LN10)
  const error = step / Math.pow(10, power)

  return power >= 0
    ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) *
        Math.pow(10, power)
    : -Math.pow(10, -power) /
        (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1)
}

class Node {
  constructor(x0, y0, x1, y1) {
    this.x0 = x0
    this.y0 = y0
    this.x1 = x1
    this.y1 = y1
    this.xm = (x0 + x1) / 2
    this.ym = (y0 + y1) / 2

    this.empty = true
    this.leaf = null
    this.children = null
  }

  add(p) {
    const { x0, y0, x1, y1, xm, ym, leaf } = this

    if (this.empty) {
      this.leaf = p
      this.empty = false
      return
    }

    if (leaf) {
      this.children = {
        nw: new Node(x0, y0, xm, ym),
        ne: new Node(xm, y0, x1, ym),
        sw: new Node(x0, ym, xm, y1),
        se: new Node(xm, ym, x1, y1),
      }

      this.leaf = null
      this.add(leaf)
    }

    const child =
      p.x < xm
        ? p.y < ym
          ? this.children.nw
          : this.children.sw
        : p.y < ym
        ? this.children.ne
        : this.children.se

    child.add(p)
  }
}

function build_tree(data, x, y, x_scale, y_scale) {
  const points = data.map((d, i) => ({
    d,
    x: x_scale(x(d, i)),
    y: y_scale(y(d, i)),
  }))

  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity

  for (let i = 0; i < points.length; i += 1) {
    const p = points[i]

    if (p.x < x0) x0 = p.x
    if (p.y < y0) y0 = p.y
    if (p.x > x1) x1 = p.x
    if (p.y > y1) y1 = p.y
  }

  const root = new Node(x0, y0, x1, y1)

  for (let i = 0; i < points.length; i += 1) {
    const p = points[i]
    if (isNaN(p.x) || isNaN(p.y)) continue

    root.add(p)
  }

  return root
}
export class Quadtree {
  constructor(data) {
    this.data = data
    this.x = null
    this.y = null
    this.x_scale = null
    this.y_scale = null
  }

  update(x, y, x_scale, y_scale) {
    this.root = null
    this.x = x
    this.y = y
    this.x_scale = x_scale
    this.y_scale = y_scale
  }

  find(left, top, width, height, radius) {
    if (!this.root)
      this.root = build_tree(
        this.data,
        this.x,
        this.y,
        this.x_scale,
        this.y_scale
      )

    const queue = [this.root]

    let node
    let closest
    let min_d_squared = Infinity

    const x_to_px = (x) => (x * width) / 100
    const y_to_px = (y) => (y * height) / 100

    while ((node = queue.shift())) {
      if (node.empty) continue

      const left0 = x_to_px(node.x0)
      const left1 = x_to_px(node.x1)
      const top0 = y_to_px(node.y0)
      const top1 = y_to_px(node.y1)

      const out_of_bounds =
        left < Math.min(left0, left1) - radius ||
        left > Math.max(left0, left1) + radius ||
        top < Math.min(top0, top1) - radius ||
        top > Math.max(top0, top1) + radius

      if (out_of_bounds) continue

      if (node.leaf) {
        const dl = x_to_px(node.leaf.x) - left
        const dt = y_to_px(node.leaf.y) - top

        const d_squared = dl * dl + dt * dt

        if (d_squared < min_d_squared) {
          closest = node.leaf.d
          min_d_squared = d_squared
        }
      } else {
        queue.push(
          node.children.nw,
          node.children.ne,
          node.children.sw,
          node.children.se
        )
      }
    }

    return min_d_squared < radius * radius ? closest : null
  }
}
