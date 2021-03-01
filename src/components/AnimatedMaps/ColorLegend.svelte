<script>
  import { getColorScale } from './utils'

  export let extent = [0, 100]

  const textMin = 'Niedrig'
  const textMax = 'Hoch'
  const colorScale = getColorScale(extent)
  const data = [20, 22, 24, 26, 28, 30, 32]
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
