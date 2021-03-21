<script>
  import { storyData, selectedAnchors, jsonData } from 'stores'
  import * as animateScroll from 'svelte-scrollto'
  import IntersectionObserver from 'core/components/Intersectionobserver.svelte'
  import Map3D from 'components/Map3D/index.svelte'
  import Tooltip from 'components/Tooltip.svelte'
  import Loading from 'components/Loading.svelte'
  import Tile from 'components/Tile/Tile.svelte'
  import TooltipContent from 'components/TooltipContent.svelte'
  import Anchor from 'components/Anchor.svelte'
  import StaticMap from 'components/AnimatedMaps/StaticMap.svelte'

  let innerHeight
  let innerWidth
  let step
  $: miniMapWidth = innerWidth < 600 ? 60 : 80
  $: miniMapHeight = miniMapWidth * 1.26
  $: data = $storyData ? $storyData.szenarien : null
  $: mapData = $jsonData ? $jsonData.germany : null
  $: {
    if (data && mapData) {
      setTimeout(() => {
        animateScroll.scrollTo({
          element: `[id='anchor-1.1']`,
          offset: -80,
          duration: 1500,
          delay: 0,
        })
      }, 50)
    }
  }

  function handleActiveStep(e) {
    step = e.detail
  }

  $: currentData = $storyData
    ? $storyData.szenarien.find((d) => d.step == step)
    : false

  $: marker = currentData ? currentData.marker : false
  $: showMinimap = currentData ? currentData.showMinimap : false

  const setText = (txt) => {
    if (typeof txt === 'string') {
      return txt
    } else {
      return txt($storyData)
    }
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .szenario {
    margin-left: 20px;
    height: 80vh;
    width: 400px;

    @include respond-max-screen-phablet {
      width: calc(100% - 20px);
      margin-left: 10px;
    }
  }

  .tile-title {
    margin: 0px;
  }

  .tile-paragraph {
    margin: 7px 0;
  }

  .minimap-container {
    heigth: 150px;
    width: 115px;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 25px;
    right: 25px;
    @include respond-min-screen-tablet {
      bottom: 30px;
      right: 30px;
    }
  }
  .extra {
    margin-bottom: 75vh;
    overflow: scroll;

    @include respond-min-screen-tablet {
      margin-left: 0px;
      padding: 0 30px 0 20px;
    }
  }
  .sticky {
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    top: 0;
    position: sticky;
  }
</style>

<div class="szenarien container">
  {#if data && mapData}
    <div class="sticky">
      <Map3D data={currentData} />
      {#if showMinimap}
        <div class="minimap-container">
          <StaticMap
            width={miniMapWidth}
            height={miniMapHeight}
            hasMarker={marker}
            strokeWidth={1}
            stroke="#6B6E82"
            data={mapData} />
        </div>
      {/if}
      {#each $selectedAnchors as d, i}
        <Tooltip anchor={d.coords}>
          <TooltipContent data={d.text} />
        </Tooltip>
      {/each}
    </div>
    {#each data as item, i}
      <div class="szenario {i === data.length - 1 ? 'extra' : ''}">
        <Anchor anchorId={item.step}>
          <IntersectionObserver
            rootMargin={`-${0.25 * 100}% 0% -${100 - 0.55 * 100}% 0%`}
            on:step={handleActiveStep}
            bind:step={item.step}>
            <Tile isMap={true} active={item.step === step}>
              <h3 class="tile-title">{setText(item.text.title)}</h3>
              <p class="tile-paragraph">
                {@html setText(item.text.paragraph)}
              </p>
            </Tile>
          </IntersectionObserver>
        </Anchor>
      </div>
    {/each}
  {:else}
    <Loading />
  {/if}
</div>
<svelte:window bind:innerHeight bind:innerWidth />
