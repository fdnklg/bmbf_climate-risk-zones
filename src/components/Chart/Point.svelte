<script>
  import { getChartContext } from "./Chart.svelte";
  const { x_scale, y_scale } = getChartContext();
  export let x;
  export let y;
</script>

<style>
  .pancake-point {
    position: absolute;
    width: 0;
    height: 0;
  }
</style>

<div class="pancake-point" style="left: {$x_scale(x)}%; top: {$y_scale(y)}%">
  <slot />
</div>
