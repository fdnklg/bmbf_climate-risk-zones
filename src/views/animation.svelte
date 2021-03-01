<script>
  import { jsonData } from 'stores'

  import StaticMap from 'components/AnimatedMaps/StaticMap.svelte'
  import Title from 'components/Title.svelte'
  import ButtonRound from 'components/ButtonRound.svelte'
  import ColorLegend from 'components/AnimatedMaps/ColorLegend.svelte'
  import Source from 'components/Source.svelte'
  import TimeSeriesSlider from 'components/TimeSeriesSlider.svelte'
  import { afterUpdate } from 'svelte'

  $: isActive = false
  $: btnLabel = isActive ? 'Pausieren' : 'Abspielen'

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

  let dateIndex = 0

  afterUpdate(() => {
    console.log(dateLength)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    margin: auto;
    padding: 40px;

    @include respond-max-screen-phablet {
      width: calc(100% - 40px);
    }
  }
  .footer {
    width: 100%;
    display: flex;
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
    margin: 20px 0;
  }
</style>

<div class="container animation">
  <Title>Es wird immer heißer</Title>
  {#if $jsonData}
    <ColorLegend extent={$jsonData.meta.extentGermany} />
    <div class="map-container">
      <StaticMap
        width={400}
        height={550}
        {dateIndex}
        meta={$jsonData.meta}
        data={$jsonData.kreise} />
      <TimeSeriesSlider
        data={$jsonData.meta.avgGermany}
        meta={$jsonData.meta}
        min={0}
        max={dateLength}
        value={dateIndex}
        on:year={handleYear} />
    </div>
  {/if}
  <div class="footer">
    <Source
      data={{ label: 'Helmholtz Zentrum für Umweltforschung (UFZ)', url: 'https://google.com' }} />
    <ButtonRound
      type={isActive ? 'pause' : 'play'}
      handleClick={handleToggle} />
  </div>
</div>
