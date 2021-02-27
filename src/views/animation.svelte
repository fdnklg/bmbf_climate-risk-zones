<script>
  import StaticMap from 'components/AnimatedMaps/StaticMap.svelte'

  import Title from 'components/Title.svelte'
  import Button from 'components/Button.svelte'
  import ColorLegend from 'components/AnimatedMaps/ColorLegend.svelte'
  import Source from 'components/Source.svelte'

  $: isActive = true
  $: btnLabel = isActive ? 'Pausieren' : 'Abspielen'

  let interval = setInterval(() => {
    dateIndex === 25 ? (dateIndex = 0) : dateIndex++
    // @TODO still hard coded, make dynamic later;
  }, 1000)

  function handleToggle() {
    if (isActive) clearInterval(interval)
    if (!isActive) {
      interval = setInterval(() => {
        dateIndex === 25 ? (dateIndex = 0) : dateIndex++
        // @TODO still hard coded, make dynamic later;
      }, 1000)
    }
    isActive = !isActive
  }

  import { jsonData } from 'stores'

  let dateIndex = 0
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    margin: auto;
    margin-bottom: 40px;

    @include respond-max-screen-phablet {
      width: calc(100% - 40px);
    }
  }
  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .year-label {
    font-size: $font-size-m;
    font-family: $font-bold;
    margin: auto;
    width: 100px;
    text-align: center;
  }
  .map-container {
    margin: 20px 0;
  }
</style>

<div class="container animation">
  <Title>Deutschlands Böden <br /> werden immer trockener</Title>
  {#if $jsonData}
    <ColorLegend />
    <div class="map-container">
      <div class="year-label">{1995 + dateIndex}</div>
      <StaticMap {dateIndex} data={$jsonData} />
    </div>
  {/if}
  <div class="footer">
    <Button handleClick={handleToggle}>{btnLabel}</Button>
    <Source
      data={{ label: 'Helmholtz Zentrum für Umweltforschung (UFZ)', url: 'https://google.com' }} />
  </div>
</div>
