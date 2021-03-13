<script>
  import { zeitreihenData } from 'stores'

  import Tile from 'components/Tile/Tile.svelte'
  import Anchor from 'components/Anchor.svelte'
  import Loading from 'components/Loading.svelte'
  import ChartZeitreihe from 'components/ChartZeitreihe.svelte'
  import LayoutScrollytelling from 'components/LayoutScrollytelling.svelte'
  import IntersectionObserver from 'core/components/Intersectionobserver.svelte'
  import { afterUpdate } from 'svelte'

  function isScrollingDown(current, before) {
    if (before) return parseFloat(before) > parseFloat(current)
    return true
  }

  let step
  let scrollingDown
  $: currentData = $zeitreihenData ? $zeitreihenData : null

  function handleActiveStep(e) {
    const stepCurrent = e.detail
    scrollingDown = isScrollingDown(step, stepCurrent)
    step = stepCurrent
    // activeAnchor.set(stepCurrent)
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .container {
    width: 100vw;
    max-width: 100%;
    @include max-width;
  }

  .tile-title {
    margin: 0px !important;
  }

  .wrapper {
    width: calc(100% - 20px);
    height: auto;
    margin: auto;
  }

  .tile-paragraph {
    margin: 7px 0;
  }

  .sticky {
    top: 30vh;
    position: sticky;
  }
</style>

<div class="emissionen container">
  {#if currentData}
    <LayoutScrollytelling>
      <div class="sticky" slot="vis">
        <ChartZeitreihe {scrollingDown} {step} />
      </div>
      <div class="wrapper" slot="text">
        {#each currentData as item, i}
          <IntersectionObserver
            on:step={handleActiveStep}
            bind:step={item.step}>
            <Anchor anchorId={item.step} />
            <Tile
              isLast={i === currentData.length - 1}
              active={item.step === step}>
              <h3 class="tile-title">{item.text.title}</h3>
              <p class="tile-paragraph">
                {@html item.text.paragraph}
              </p>
            </Tile>
          </IntersectionObserver>
        {/each}
      </div>
    </LayoutScrollytelling>
  {:else}
    <Loading />
  {/if}
</div>
