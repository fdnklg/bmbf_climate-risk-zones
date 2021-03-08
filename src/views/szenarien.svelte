<script>
  import { afterUpdate } from 'svelte'
  import { storyData, selectedAnchors, jsonData } from 'stores'

  import IntersectionObserver from 'core/components/Intersectionobserver.svelte'
  import Map3D from 'components/Map3D/index.svelte'
  import Tooltip from 'components/Tooltip.svelte'
  import Loading from 'components/Loading.svelte'
  import Tile from 'components/Tile/Tile.svelte'
  import TooltipContent from 'components/TooltipContent.svelte'
  import Anchor from 'components/Anchor.svelte'
  import StaticMap from 'components/AnimatedMaps/StaticMap.svelte'

  let step
  $: data = $storyData ? $storyData.szenarien : null
  $: mapData = $jsonData ? $jsonData.germany : null

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
      return txt($storyData);
    }
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .szenario {
    margin-left: 20px;
    height: 500px;
    width: 400px;

    @include respond-max-screen-phablet {
      width: calc(100% - 20px);
      margin-left: 10px;
    }
  }

  .minimap-container {
    heigth: 150px;
    width: 115px;
    position: absolute;
    bottom: 40px;
    right: 40px;
  }
  .extra {
    margin-bottom: 75vh;
    overflow: scroll;
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
            width={115}
            height={150}
            hasMarker={marker}
            strokeWidth={1}
            stroke="#808080"
            data={mapData} />
        </div>
      {/if}
      {#each $selectedAnchors as d}
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
