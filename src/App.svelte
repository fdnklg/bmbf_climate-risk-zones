<script>
  import { onMount } from 'svelte'
  import { zipcodes, data, jsonData } from 'stores'
  import { loadFile, loadTopojson } from 'utils'
  import { metadata, content } from 'config'
  import { zipCodesUrl } from 'constants'

  import Zeitreihe from 'views/zeitreihe.svelte'
  import Szenarien from 'views/szenarien.svelte'
  import Onboarding from 'views/onboarding.svelte'
  import Animation from 'views/animation.svelte'
  import Series from 'views/series.svelte'

  import Header from 'components/Header.svelte'
  import Meta from 'core/components/Meta.svelte'
  import Section from 'components/Section.svelte'

  function handleActiveStep(e) {
    step = e.detail
    activeAnchor.set(e.detail)
  }

  onMount(async () => {
    const topo = await loadTopojson(
      'data/timeseries_air_temperature_mean_avg.simple.topo.json'
    )
    const codes = await loadFile(zipCodesUrl)
    jsonData.set(topo)
    zipcodes.set(codes.columns)
    data.set(content)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  global {
    .disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
  .container {
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    color: $color-main;
    margin: 0 auto;
  }
</style>

<div class="container">
  <Meta meta={metadata} />
  <Header />
  <Section>
    Steigende Temperaturen, vermehrte Extremwettereignisse und andere
    Veränderungen, welche sich auf den fortschreitenden Klimawandel zurückführen
    lassen, haben einen direkten Einfluss auf unsere Umwelt und auf unser
    alltägliches Leben. Die Auswirkungen bekommen somit nicht nur unsere Tier-
    und Pflanzenwelt zu spüren, sondern auch wir selber, die durch
    Extremwetterlagen genauso belastet werden, wie z.B. auch die Land- und
    Forstwirtschaft. Erfahre mehr Details für deine spezifische Region:
  </Section>
  <Onboarding />
  <Szenarien />
  <Section>
    Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität
    produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser
    gesamter Fußabdruck setzt sich aus all dem zusammen.
  </Section>
  <Section>
    Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität
    produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser
    gesamter Fußabdruck setzt sich aus all dem zusammen.
  </Section>
  <Zeitreihe />
  <Animation />
</div>
