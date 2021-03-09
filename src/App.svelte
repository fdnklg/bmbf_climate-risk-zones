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
  import ReadingList from 'components/ReadingList.svelte';

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
    Steigende Temperaturen, vermehrte Extremwettereignisse und andere Veränderungen, welche sich auf den fortschreitenden Klimawandel zurückführen lassen, haben einen direkten Einfluss auf unsere Umwelt und auf unser alltägliches Leben. Die Auswirkungen bekommen somit nicht nur unsere Tier- und Pflanzenwelt zu spüren, sondern auch wir selber, die durch Extremwetterlagen genauso belastet werden, wie z.B. auch die Land- und Forstwirtschaft. Erfahre mehr Details für deine spezifische Region:
  </Section>
  <Onboarding />
  <Szenarien />
  <Section>
    Wenn über die Folgen des Klimawandels berichtet wird, hören wir häufig vom Schmelzen des arktischen Eises, von exotischen Inseln, welche vom Anstieg des Meeresspiegels bedroht sind, oder von den extremen Bränden in Australien oder der Westküste der USA. Doch dies sind nur die Extreme der Klimawandelfolgen. Auch in unseren Breiten können wir die Folgen bereits spüren.<br /><br />
    In vielen Regionen Deutschlands hat es in den letzten Jahren vermehrt längere Dürreperioden gegeben. Frost- und Schneetage haben abgenommen, während heißte Tage (> 30°C) und sogenannte Tropennächte (> 20°C) zugenommen haben.
  </Section>
  <Zeitreihe />
  <Section>
    Die folgende Karte zeigt die durchschnittliche Temperatur in Deutschland seit 1887. Über diesen langen Zeitraum wird noch einmal deutlich, dass es schon immer mal heißere und kältere Jahre gab. Einen kontinuierlichen Anstieg, wie wir ihn seit den 1980er Jahren verzeichnen können, gab es in diesem Messungszeitraum bisher aber nicht. Klimawandel und Klima im Allgemeinen beschreiben genau solche langfristigen größeren Veränderungen und Zusammenhänge, die sich unabhängig von lokalen Wetterextremen in den Daten abzeichnen.
  </Section>
  <Animation />
  <Section>
    Der Klimawandel wird auch viele Risiken für Deutschland mit sich bringen. Neben Entwicklungen die versuchen den Klimawandel zu stoppen oder zumindest zu verlangsamen, wie der Reduktion von Treibhausgasemmissionen, müssen wir uns aber auch den schon jetzt eintretenden Folgen stellen. Für weiterführende Informationen empfehlen wir die Seiten des Umweltbundesamts. Im Folgenden haben wir eine Reihe Artikel zusammengestellt, die besonders Themen für deine Region hervorheben:
  </Section>
  <ReadingList />
</div>
