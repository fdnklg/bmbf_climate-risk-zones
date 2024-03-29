<script context="module">
  import { getContext } from 'svelte'
  const key = {}

  export function getChartContext() {
    return getContext(key)
  }
</script>

<script>
  import { setContext } from 'svelte'
  import { writable, derived } from 'svelte/store'
  import { scaleLinear } from 'd3-scale'

  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const subsetTweened = tweened(undefined, {
    duration: 300,
    easing: cubicOut,
  })

  export let x1 = 0
  export let y1 = 0
  export let x2 = 1
  export let y2 = 1
  export let clip = false
  export let subset = false

  let chart

  const _x1 = writable()
  const _y1 = writable()
  const _x2 = writable()
  const _y2 = writable()

  const width = writable()
  const height = writable()
  const pointer = writable(null)

  const handle_mousemove = (e) => {
    const bcr = chart.getBoundingClientRect()
    const left = e.clientX - bcr.left
    const top = e.clientY - bcr.top

    const x = $x_scale_inverse((100 * left) / (bcr.right - bcr.left))
    const y = $y_scale_inverse((100 * top) / (bcr.bottom - bcr.top))
    pointer.set({ x, y, left, top })
  }

  const handle_mouseleave = () => {
    pointer.set(null)
  }

  $: _x1.set(x1)
  $: _y1.set(y1)
  $: _x2.set(x2)
  $: _y2.set(y2)

  $: {
    $subsetTweened = subset ? subset : 100
  }

  const x_scale = derived([_x1, _x2], ([$x1, $x2]) => {
    return scaleLinear([$x1, $x2], [0, 100])
  })
  const y_scale = derived([_y1, _y2], ([$y1, $y2]) => {
    return scaleLinear([$y1, $y2], [100, 0])
  })

  const x_scale_inverse = derived(x_scale, ($x_scale) => $x_scale.invert)
  const y_scale_inverse = derived(y_scale, ($y_scale) => $y_scale.invert)

  setContext(key, {
    x1: _x1,
    y1: _y1,
    x2: _x2,
    y2: _y2,
    x_scale,
    y_scale,
    pointer,
    width,
    height,
  })
</script>

<style>
  .chart {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .clip {
    overflow: hidden;
  }
</style>

<div
  class="chart"
  bind:this={chart}
  bind:clientWidth={$width}
  bind:clientHeight={$height}
  on:mousemove={handle_mousemove}
  on:mouseleave={handle_mouseleave}
  class:clip
  style="width: {$subsetTweened}%">
  <slot />
</div>
