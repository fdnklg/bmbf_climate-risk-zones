<script>
  import { jsonData } from 'stores'

  import StaticMap from 'components/AnimatedMaps/StaticMap.svelte'
  import Title from 'components/Title.svelte'
  import ButtonRound from 'components/ButtonRound.svelte'
  import ColorLegend from 'components/AnimatedMaps/ColorLegend.svelte'
  import Source from 'components/Source.svelte'
  import TimeSeriesSlider from 'components/TimeSeriesSlider.svelte'
  import { getColorScale } from 'components/AnimatedMaps/utils.js'

  let windowWidth

  $: svgWidth = 400
  $: svgHeight = 550

  $: {
    if (windowWidth) {
      if (windowWidth < 600) {
        svgWidth = windowWidth - 80
        svgHeight = svgWidth * 1.3
      }
    }
  }
  $: isActive = true

  $: dateLength = $jsonData
    ? $jsonData.kreise.features[0].properties.data.length - 1
    : 0

  let interval

  $: {
    clearInterval(interval)
    if (isActive) interval = setInterval(updateDate, 750)
  }

  function updateDate() {
    dateIndex === dateLength ? (dateIndex = 0) : dateIndex++
  }

  function handleYear(e) {
    dateIndex = e.detail
  }

  function handleToggle() {
    clearInterval(interval)
    if (!isActive) interval = setInterval(updateDate, 750)
    isActive = !isActive
  }

  $: {
    if (windowWidth > 550) {
      svgWidth = windowWidth - 40
    }
  }

  let dateIndex = 0

  $: colorScale = $jsonData
    ? // ? getColorScale([$jsonData.meta.value_min, $jsonData.meta.value_max])
      getColorScale()
    : false
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    margin: auto;

    @include respond-max-screen-phablet {
      width: calc(100% - 40px);
    }
  }
  .footer {
    width: 100%;
    max-width: 550px;
    display: flex;
    margin: auto;
    justify-content: space-between;
    align-items: center;

    &:first-child {
      width: 50%;
    }
  }
  .year-label {
    font-size: $font-size-m;
    font-family: $font-bold;
    margin: auto;
    width: 100px;
    text-align: center;
  }
  .map-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>

<div class="container animation">
  <Title align="center">Deutschland wird <br /> immer wärmer</Title>
  {#if $jsonData && $jsonData.meta}
    <ColorLegend extent={$jsonData.meta.extentGermany} />
    <div class="map-container">
      <StaticMap
        width={svgWidth}
        height={svgHeight}
        {dateIndex}
        {colorScale}
        data={$jsonData.kreise} />
    </div>
    <TimeSeriesSlider
      data={$jsonData.meta.avgGermany}
      meta={$jsonData.meta}
      min={0}
      max={dateLength}
      value={dateIndex}
      on:year={handleYear} />
  {/if}
  <div class="footer">
    <div style="display: block;">
      <a href="https://google.com">Helmholtz Zentrum für Umweltforschung (UFZ)</a>
    </div>
    <ButtonRound
      type={isActive ? 'pause' : 'play'}
      handleClick={handleToggle} />
  </div>
</div>

<svelte:window bind:innerWidth={windowWidth} />
