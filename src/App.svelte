<script>
  import { onMount } from 'svelte'
  import { zipcodes, data } from 'stores'
  import { loadFile } from 'utils'
  import { metadata, zipcodesUrl, content } from 'config'

  import Zeitreihe from 'views/zeitreihe.svelte'
  import Szenarien from 'views/szenarien.svelte'
  import Onboarding from 'views/onboarding.svelte'

  import Header from 'components/Header.svelte'
  import Meta from 'core/components/Meta.svelte'
  import Section from 'components/Section.svelte'

  function handleActiveStep(e) {
    step = e.detail
    activeAnchor.set(e.detail)
  }

  onMount(async () => {
    const codes = await loadFile(zipcodesUrl)
    // const randomZipcode = parseInt(
    //   codes.columns[parseInt(codes.columns.length * Math.random())]
    // )
    // activeZipcode.set(randomZipcode)

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
    Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität
    produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser
    gesamter Fußabdruck setzt sich aus all dem zusammen. Nichtsdesto trotz soll
    dieser Artikel darauf aufmerksam machen, welchen Einfluss unsere Wahl der
    Fortbewegungsmittel auf unseren CO2-Fußabdruck hat.
  </Section>
  <Onboarding />
  <Szenarien />
  <Section>
    Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität
    produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser
    gesamter Fußabdruck setzt sich aus all dem zusammen.
  </Section>
  <Zeitreihe />
  <Section>
    Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität
    produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser
    gesamter Fußabdruck setzt sich aus all dem zusammen.
  </Section>
</div>
