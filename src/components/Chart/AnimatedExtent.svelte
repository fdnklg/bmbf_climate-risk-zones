<script>
  import { getChartContext } from './Chart.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { afterUpdate } from 'svelte'
  const { x_scale, y_scale } = getChartContext()

  export let x
  export let y
  export let y1
  export let duration = 400
  export let index = 0
  export let delay = 10
  export let scrollingDown = false
  export let animated

  const position = tweened(scrollingDown ? y : y1, {
    duration: duration,
    easing: cubicOut,
  })

  let style
  $: {
    const _x1 = $x_scale(x)
    const _x2 = $x_scale(x)
    const _y1 = $y_scale(y)
    const _y2 = $y_scale(animated ? $position : y1)

    const left = Math.min(_x1, _x2)
    const top = Math.min(_y1, _y2)
    const bottom = Math.max(_y1, _y2)

    const height = bottom - top

    style = `left: ${left}%; bottom: ${100 - bottom}%; height: ${height}%;`
  }

  afterUpdate(() => {
    if (animated) {
      setTimeout(() => {
        position.set(scrollingDown ? y1 : y)
      }, delay) //  * index
    }
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .pancake-point {
    position: absolute;
    width: 0;
    height: 0;
  }
  .pancake-box {
    position: absolute;
    width: 1px;
    background-color: $color-main-20;
    height: 0;
  }
</style>

<div class="pancake-box" {style}>
  <slot name="box" />
</div>
<div
  class="pancake-point"
  style="left: {$x_scale(x)}%; top: {$y_scale(animated ? $position : y1)}%">
  <slot name="pointEnd" />
</div>
<div class="pancake-point" style="left: {$x_scale(x)}%; top: {$y_scale(y)}%">
  <slot name="pointStart" />
</div>
