<script>
  import { createEventDispatcher } from 'svelte'
  import { getChartContext } from './Chart.svelte'
  import { Quadtree } from './utils'
  import { default_x, default_y } from './utils'

  export let data
  export let x = default_x
  export let y = default_y
  export let radius = Infinity

  export let closest = undefined

  const { pointer, x_scale, y_scale, width, height } = getChartContext()

  $: quadtree = new Quadtree(data)
  $: quadtree.update(x, y, $x_scale, $y_scale)

  let prev_closest
  let next_closest

  $: next_closest =
    $pointer !== null
      ? quadtree.find($pointer.left, $pointer.top, $width, $height, radius)
      : null

  $: if (next_closest !== prev_closest) {
    closest = prev_closest = next_closest
  }
</script>

<slot {closest} />
