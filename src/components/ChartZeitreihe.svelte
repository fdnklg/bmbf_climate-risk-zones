<script>
  import { zeitreihenData } from 'stores'
  import { draw } from 'svelte/transition'
  import { quadInOut } from 'svelte/easing'

  import Chart from './Chart/Chart.svelte'
  import Quadtree from './Chart/Quadtree.svelte'
  import Grid from './Chart/Grid.svelte'
  import Columns from './Chart/Columns.svelte'
  import ZeitreiheHeader from './Chart/ZeitreiheHeader.svelte'
  import Footer from './Chart/Footer.svelte'
  import Point from './Chart/Point.svelte'
  import AnimatedPoint from './Chart/AnimatedPoint.svelte'
  import AnimatedExtent from './Chart/AnimatedExtent.svelte'
  import Svg from './Chart/Svg.svelte'
  import Line from './Chart/Line.svelte'
  import Meta from '../core/components/Meta.svelte'
  import { afterUpdate } from 'svelte'

  let domNode

  let closest

  const get = {
    xMin: (d) => d.meta.extentX[0],
    xMax: (d) => d.meta.extentX[1],
    yMin: (d) => d.meta.extentY[0],
    yMax: (d) => d.meta.extentY[1],
  }

  export let step = '2.1'
  export let scrollingDown

  let animated = false
  $: {
    if (step === '2.2' && scrollingDown) {
      animated = true
    } else if (step === '2.1' && !scrollingDown) {
      animated = true
    } else {
      animated = false
    }
  }

  $: zeitreihe = $zeitreihenData
    ? $zeitreihenData.find((item) => item.step === step)
    : false

  function positions(d) {
    return d.data.map((d, i) => ({
      id: `${d.i}-${d.year}`,
      x: d.year,
      y1: d.min,
      y2: d.max,
      yPostcode: d.avgPostcode,
      yGermany: d.avgGermany,
    }))
  }

  let data = []

  $: data = zeitreihe ? positions(zeitreihe) : null

  $: hasShow = zeitreihe.show
  $: showYPostcode = hasShow ? zeitreihe.show.includes('yPostcode') : false
  $: showYGermany = hasShow ? zeitreihe.show.includes('yGermany') : false
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .barchart {
    padding: 2em 0 5.3em 2em;
    height: 220px;
    margin: auto;

    @include respond-max-screen-phablet {
      height: 130px;
      padding-left: 10px;
      width: calc(100% - 40px);
    }
  }

  .container {
    height: auto;
    width: 100%;
    max-width: $size-chart;
    margin: 0 auto;
    top: 25%;
    padding: $space-m;

    @include respond-max-screen-medium {
      max-width: none;
      width: auto;
    }

    @include respond-max-screen-phablet {
      padding-top: 10px;
    }
  }

  .annotation-dot {
    width: 6px;
    height: 6px;
    border-radius: 100px;
    transform: translate(-4px, -4px);
    border: 1px solid white;
  }

  .line {
    fill: none;
    stroke: black;
    stroke-width: 1.5px;
    opacity: 1;
  }

  .grid-line {
    position: relative;
    display: block;
    text-align: right;
  }

  .grid-line.horizontal {
    width: auto;
    border-bottom: 1px dashed #ccc;
  }

  .data {
    fill: none;
    stroke: black;
    stroke-width: 1.5px;
    opacity: 1;
    @include transition-s;
    &.highlight {
      stroke-width: 3px;
      opacity: 1;
    }
  }

  .data-contour {
    stroke: white;
    opacity: 1;
    stroke-width: 5px;
    fill: none;
  }

  .x-label {
    position: absolute;
    width: 4em;
    bottom: -28px;
    font-size: $font-size-xs;
    text-align: center;
    transform: translateX(-50%);
    color: $color-main-60;
  }

  .annotation-label {
    font-family: $font-bold;
    transform: translate(4px, -10px);
    &.year {
      font-family: $font-regular;
      transform: translate(-18px, 5px);
      font-size: $font-size-xs;
    }
  }

  .x-tip {
    width: 1px;
    height: 5px;
    position: absolute;
    bottom: -5px;
    background-color: $color-main-20;
  }

  .label {
    font-size: $font-size-xs;
    line-height: $line-height-s;
    color: $color-main;
    display: block;

    &.value {
      display: none;
    }

    @include respond-max-screen-phablet {
      display: none;

      &.value {
        display: block;
      }
    }
  }

  .grid-line {
    span.y-label {
      left: -33px;
      bottom: -12px;
      width: 26px;
      color: $color-main-60;
      font-size: 13px;
    }

    span.y-label-desc {
      left: -23px;
      top: -29px;
      color: $color-main-60;
      font-size: 13px;
    }
  }

  .legend {
    display: none;
    margin-bottom: 10px;
    @include respond-max-screen-phablet {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 10px;
    opacity: 0.35;

    &.highlighted {
      opacity: 1;
    }

    .extent-line {
      width: 1px;
      background-color: black;
    }

    .legend-line {
      height: 3px;
      border-radius: 8px;
      width: 10px;
      margin-right: 5px;
    }

    .legend-label {
      font-size: $font-size-xs;
    }
  }
  .column {
    position: absolute;
    /* left: 1px;
		width: calc(100% - 2px); */
    left: 0;
    width: 100%;
    // border-left: 0.25px solid rgba(255, 255, 255, 1);
    // border-right: 0.25px solid rgba(255, 255, 255, 1);
    box-sizing: border-box;
    height: 100%;
    opacity: 1;
    border-radius: 0px 0px 0 0;
  }
  .annotation {
    font-size: $font-size-s;
  }
  .grid-line span {
    position: absolute;
    left: 0;
    bottom: 2px;
    font-size: 14px;
    color: $color-light-60;
  }

  .column.data {
    background: red;
  }
</style>

<div class="container embed sticky padding">
  {#if data}
    <div class="barchart" bind:this={domNode}>
      <ZeitreiheHeader
        datakey={zeitreihe.datakey}
        gradient={zeitreihe.meta.gradient} />
      <Chart
        x1={get.xMin(zeitreihe)}
        x2={get.xMax(zeitreihe)}
        y1={get.yMin(zeitreihe)}
        y2={get.yMax(zeitreihe)}>
        <Grid horizontal count={5} let:value>
          <div class="grid-line horizontal">
            <span class="y-label">{value}</span>
          </div>
        </Grid>
        <div class="background">
          {#each data as d, i (d.id)}
            <AnimatedExtent
              x={d.x}
              y={d.y1}
              y1={d.y2}
              {animated}
              {scrollingDown}
              index={i}>
              <div slot="box" class="extent-line" />
              <div
                slot="pointEnd"
                style="background-color: {zeitreihe.meta.gradient[1]}"
                class="annotation-dot" />
              <div
                slot="pointStart"
                style="background-color: {zeitreihe.meta.gradient[0]}"
                class="annotation-dot" />
            </AnimatedExtent>
          {/each}
        </div>
        {#if !closest}
          <Grid vertical count={5} let:value>
            <span class="x-label">{value}</span>
            <div class="x-tip" />
          </Grid>
        {/if}

        <Svg>
          {#if showYPostcode}
            <Line {data} y={(d) => d.yPostcode} let:d>
              <path
                in:draw={{ duration: 500 }}
                out:draw={{ duration: 500 }}
                style="stroke: white; stroke-width: 6px;"
                class="line"
                {d} />
            </Line>
            <Line {data} y={(d) => d.yPostcode} let:d>
              <path
                in:draw={{ duration: 500, easing: quadInOut }}
                out:draw={{ duration: 500, easing: quadInOut }}
                style="stroke: grey; stroke-width: 2px;"
                class="line"
                {d} />
            </Line>
          {/if}
          {#if showYGermany}
            <Line {data} y={(d) => d.yGermany} let:d>
              <path
                style="stroke: white; stroke-width: 6px;"
                class="line"
                in:draw={{ duration: 500, easing: quadInOut }}
                out:draw={{ duration: 500, easing: quadInOut }}
                {d} />
            </Line>
            <Line {data} y={(d) => d.yGermany} let:d>
              <path
                style="stroke: black; stroke-width: 2px;"
                class="line"
                in:draw={{ duration: 500, easing: quadInOut }}
                out:draw={{ duration: 500, easing: quadInOut }}
                {d} />
            </Line>
          {/if}
        </Svg>

        {#if closest}
          <Point x={closest.x} y={get.yMax(zeitreihe)}>
            <div
              class="annotation"
              style="border-left: 1px dashed grey; width: 400px; height: 220px; background-color: rgba(255,255,255,.9);" />
          </Point>
          <Point x={closest.x} y={closest.y}>
            <div class="annotation-label avg"><strong>{closest.y}</strong></div>
          </Point>
          <Point x={closest.x} y={get.yMin(zeitreihe)}>
            <div class="annotation-label year">{closest.x}</div>
          </Point>
          <Point x={closest.x} y={closest.y2}>
            <div
              style="color: {zeitreihe.meta.gradient[1]}"
              class="annotation-label">
              {closest.y2}
            </div>
          </Point>
          <Point x={closest.x} y={closest.y1}>
            <div
              style="color: {zeitreihe.meta.gradient[0]}"
              class="annotation-label">
              {closest.y1}
            </div>
          </Point>
        {/if}

        <Quadtree {data} bind:closest />
      </Chart>
    </div>
    <Footer data={zeitreihenData.meta} />
  {/if}
</div>
