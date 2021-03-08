<script>
  import { getChartContext } from './Chart.svelte'
  import { tweened } from 'svelte/motion'
  const { x_scale, y_scale } = getChartContext()

  export let x
  export let y
  export let y1
  export let duration = 200
  export let index = 0
  export let delay = 15

  const position = tweened(y, {
    duration: duration,
  })

  setTimeout(() => {
    position.set(y1)
  }, delay * index)
</script>

<style>
  .pancake-point {
    position: absolute;
    width: 0;
    height: 0;
  }
</style>

<div
  class="pancake-point"
  style="left: {$x_scale(x)}%; top: {$y_scale($position)}%">
  <slot />
</div>
