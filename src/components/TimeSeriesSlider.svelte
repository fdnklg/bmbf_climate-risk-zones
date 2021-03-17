<script>
  import { createEventDispatcher, afterUpdate } from 'svelte'
  import { getColorScale } from 'components/AnimatedMaps/utils.js'
  import { round } from 'utils'

  import Chart from './Chart/Chart.svelte'
  import Grid from './Chart/Grid.svelte'
  import Svg from './Chart/Svg.svelte'
  import Line from './Chart/Line.svelte'
  import Point from './Chart/Point.svelte'

  export let data
  export let meta

  export let min = 0
  export let max = 200
  export let value = 0

  let windowWidth

  $: ticks = windowWidth < 650 ? 3 : 6
  $: year = (i) => 2020 - max + i
  $: colorScale = meta ? getColorScale(meta.extentGermany) : null

  const get = {
    yMin: (d) => d.extentGermany[0],
    yMax: (d) => d.extentGermany[1],
    xMin: (d) => d.year_min,
    xMax: (d) => d.year_max,
  }

  function getLine(d) {
    return data.map((d, i) => ({
      x: year(i),
      y: d,
    }))
  }

  function getPoint(d, value) {
    return {
      x: year(value),
      y: d[value],
    }
  }

  const dispatch = createEventDispatcher()

  let dataLine = []

  $: dataLine = data ? getLine(data) : null
  $: currentPoint = data ? getPoint(data, value) : null

  afterUpdate(() => {
    dispatch('year', value)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .container {
    height: auto;
    width: 100%;
    max-width: 490px;
    margin: 0 auto;
    top: 25%;
    padding: $space-m $space-m 0 $space-m;

    @include respond-max-screen-medium {
      width: 100%;
      max-width: 490px;
    }

    @include respond-max-screen-phablet {
      padding-top: 40px;
    }
  }

  .x-tip {
    width: 1px;
    height: 5px;
    position: absolute;
    bottom: 7px;
    background-color: $color-main-20;
  }

  .line {
    fill: none;
    stroke: black;
    stroke-width: 1.5px;
    opacity: 1;
  }

  .time-series-chart {
    height: 80px;
    padding: 3em 0 2em 0em;
    margin: 0 0 0px 0;

    @include respond-max-screen-phablet {
      height: 80px;
      padding: 3em 0 0 20px;
      width: calc(100% - 40px);
    }
  }

  .x-label {
    position: absolute;
    width: 4em;
    bottom: -15px;
    font-size: $font-size-xs;
    text-align: center;
    transform: translateX(-50%);
    color: $color-main-60;
    letter-spacing: 0.03em;
  }

  .grid-line {
    position: relative;
    display: block;
  }

  .grid-line.horizontal {
    width: calc(100% + 2em);
    left: -2em;
    border-bottom: 1px dashed #ccc;
  }

  .grid-line span {
    position: absolute;
    left: 0;
    bottom: 2px;
    font-family: sans-serif;
    font-size: 14px;
    color: #999;
  }
  .grid-line {
    .y-label {
      font-family: $font-regular;
      left: 0px;
      bottom: -3px;
      width: auto;
      color: $color-main-60;
      font-size: $font-size-xs;
      letter-spacing: 0.03em;
    }

    span.y-label-desc {
      left: 18px;
      font-family: $font-regular;
      color: $color-main-60;
      font-size: $font-size-xs;
      letter-spacing: 0.03em;
      bottom: -3px;
    }
  }
  .annotation-dot {
    max-width: 8px;
    min-width: 8px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    transform: translate(-5px, -5px);
    border: 1px solid white;
    @include ui-shadow;
  }
  .annotation-line {
    width: 1px;
    height: 110px;
    transform: translateX(1);
    background-color: $color-main-20;
  }

  input[type='range'] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
    width: calc(100% + 36px);
    transform: translate(-18px, -15px);
    padding: 0;
    z-index: 10;
    border: none;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type='range']:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  input[type='range']::-ms-track {
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: white;
    border-color: transparent;
    color: transparent;
  }

  .tooltip {
    width: 60px;
    height: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    @include box-shadow-btn;
    border-radius: 3px;
    transform: translate(-50%, -100%);
  }

  .year-label {
    opacity: $color-main;
    line-height: 120%;
    font-size: $font-size-xs;
  }
  .value-label {
    font-family: $font-bold;
    line-height: 120%;
    font-size: $font-size-s;
  }

  .y-axis-label {
    transform: translate(-10px, -20px);
    position: absolute;
    color: $color-main-60;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 36px;
    height: 36px;
    border-radius: 100px;
    cursor: ew-resize;
    border: 1px solid $color-main-20;
    background-image: url(/icons/icon-slider-handle.svg);
    background-color: white;
    background-repeat: no-repeat;
    background-position: center;
    @include box-shadow-btn;
  }
</style>

<div class="container">
  {#if dataLine}
    {#if windowWidth <= 768}
      <span class="y-axis-label">
        Deutsche Durchschnitts-Temperaturen
        <br />
        im 7-Jahres-Mittel
      </span>
    {/if}
    <div class="time-series-chart">
      <Chart
        x1={get.xMin(meta)}
        x2={get.xMax(meta)}
        y1={get.yMin(meta) - 1}
        y2={get.yMax(meta)}>
        <Grid horizontal count={3} let:value>
          <div class="grid-line horizontal">
            {#if value === 10}
              <span class="y-label-desc">&thinsp;°C
                {#if windowWidth > 768}
                  Deutsche Durchschnitts-Temperaturen im 7-Jahres-Mittel
                {/if}</span>
            {/if}
            <span class="y-label">{value}</span>
          </div>
        </Grid>
        <Grid vertical count={ticks} let:value>
          <span class="x-label">{value}</span>
          <div class="x-tip" />
        </Grid>

        <Svg>
          <Line data={dataLine} let:d>
            <path
              style="stroke: #cb2f44; stroke-width: 2px;"
              class="line"
              {d} />
          </Line>
        </Svg>

        <Point x={currentPoint.x} y={get.yMax(meta) + 1}>
          <div class="annotation-line" />
        </Point>

        <Point x={currentPoint.x} y={currentPoint.y}>
          <div
            style="background-color: {colorScale(currentPoint.y)}"
            class="annotation-dot" />
        </Point>

        <Point x={currentPoint.x} y={get.yMax(meta) + 1}>
          <div class="tooltip">
            <span class="year-label">{currentPoint.x}</span>
            <span
              style="color: {colorScale(currentPoint.y)};"
              class="value-label">{round(currentPoint.y, 1)}
              °C</span>
          </div>
        </Point>
      </Chart>
      <input type="range" {min} {max} bind:value />
    </div>
  {/if}
</div>

<svelte:window bind:innerWidth={windowWidth} />
