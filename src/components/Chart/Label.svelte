<script>
  import { getChartContext } from './Chart.svelte'
  const { x_scale, y_scale } = getChartContext()
  export let annotation

  const { x, y } = annotation
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .label {
    font-size: $font-size-s;
    font-stretch: unset;
  }
</style>

<text text-anchor="middle" textLength="50" alignment-baseline="central">
  <tspan class="label" x={$x_scale(x)} y={$y_scale(y)}>Rundum</tspan>
</text>
