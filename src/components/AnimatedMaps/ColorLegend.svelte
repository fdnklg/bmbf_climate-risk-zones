<script>
  import { getColorScale } from './utils'

  const textMin = 'Ungewöhnliche Trockenheit'
  const textMax = 'Außergewöhnliche Dürre'
  const colorScale = getColorScale([0, 180]) // @TODO set correct extent
  const data = [20, 40, 60, 80, 100, 120, 140, 160, 180]
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .color-legend {
    width: 100%;
    max-width: 550px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ticks {
    display: flex;
    justify-content: space-between;
    width: 152px;
    margin: 0 10px;
  }
  .tick {
    &:first-of-type {
      border-radius: 10px 0 0 10px;
    }
    &:last-of-type {
      border-radius: 0 10px 10px 0;
    }
    width: 16px;
    height: 5px;
  }
  .legend-label {
    opacity: 0.6;
  }
</style>

<div class="color-legend">
  <span class="legend-label">{textMin}</span>
  <div class="ticks">
    {#each data as tick}
      <div class="tick" style="background: {colorScale(tick)}" />
    {/each}
  </div>
  <span class="legend-label">{textMax}</span>
</div>
