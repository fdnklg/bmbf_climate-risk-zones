<script>
  import { zeitreiheHeadlines as headlines } from 'constants'

  export let datakey
  export let gradient
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .chart-header {
    margin-bottom: 10px;
  }
</style>

<div class="chart-header">
  <strong style="color: {gradient[0]}">{headlines[datakey].min}</strong>,
  <strong style="color: {gradient[1]}">{headlines[datakey].max}</strong>
  und
  <strong style="color: #000}">{headlines[datakey].avg}</strong>
  {@html headlines[datakey].metricHeadline}.
</div>
