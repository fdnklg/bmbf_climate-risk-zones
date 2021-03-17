<script>
  import { getColorScale } from './utils'

  export let extent = [4, 10]

  const colorScale = getColorScale(extent)
  const data = [6, 7, 8, 9]
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
    width: 225px;
    margin: 0 10px;
  }
  .tick {
    &.first {
      border-radius: 10px 0 0 10px;
    }
    &.last {
      border-radius: 0 10px 10px 0;
    }
    width: 53px;
    height: 5px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .legend-label {
    opacity: 0.6;
    text-align: center;
    font-size: $font-size-xs;
  }
</style>

<div class="color-legend">
  <div class="ticks">
    {#each data as tick, i}
      <div class="wrapper">
        <div
          class="tick {i === data.length - 1 ? 'last' : ''} {i === 0 ? 'first' : ''}"
          style="background: {colorScale(tick)}" />
        <span class="legend-label">{`> ${tick}`}{#if i === i}
            &thinsp;°C
          {/if}</span>
      </div>
    {/each}
  </div>
</div>
