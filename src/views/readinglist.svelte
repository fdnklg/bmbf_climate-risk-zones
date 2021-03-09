<script>
  import { storyData } from 'stores';

  const sites = [
    {
      key: 'menschliche-gesundheit',
      title: 'Menschliche Gesundheit'
    },
    {
      key: 'bauwesen',
      title: 'Bauwesen'
    },
    {
      key: 'wasser',
      title: 'Wasserhaushalt, -wirtschaft, Küsten- und Meeresschutz'
    },
    {
      key: 'boden',
      title: 'Boden'
    },
    {
      key: 'bauwesen',
      title: 'Bauwesen'
    },
    {
      key: 'biologische-vielfalt',
      title: 'Biologische Vielfalt'
    },
    {
      key: 'landwirtschaft',
      title: 'Landwirtschaft'
    },
    {
      key: 'wald-forstwirtschaft',
      title: 'Wald und Forstwirtschaft'
    },
    {
      key: 'fischerei',
      title: 'Fischerei'
    },
    {
      key: 'energiewirtschaft',
      title: 'Energiewirtschaft'
    },
    {
      key: 'verkehr',
      title: 'Verkehr, Verkehrsinfrastruktur'
    },
    {
      key: 'finanzwirtschaft',
      title: 'Finanzwirtschaft'
    },
    {
      key: 'industrie',
      title: 'Industrie'
    },
    {
      key: 'tourismus',
      title: 'Tourismuswirtschaft'
    },
    {
      key: 'raumordnung-regional',
      title: 'Raumordnung, Regional- und Bauleitplanung'
    },
    {
      key: 'bevoelkerungsschutz',
      title: 'Bevölkerungsschutz'
    }
  ];

  const climateMatch = {
    'cold': ['wasser', 'verkehr', 'bauwesen', 'industrie'],
    'warm': ['menschliche-gesundheit', 'wald-forstwirtschaft', 'landwirtschaft', 'verkehr'],
    'dry': ['wasser', 'landwirtschaft', 'wald-forstwirtschaft'],
    'mountain': ['biologische-vielfalt', 'wasser', 'bauwesen', 'verkehr', 'industrie'],
    'premountain': ['menschliche-gesundheit', 'energiewirtschaft'],
    'midmountain': ['wasser', 'tourismus'],
  };

  const denseMatch = ['menschliche-gesundheit', 'bauwesen'];

  const notDenseMatch = ['biologische-vielfalt'];

  const fluvialMatch = ['wasser', 'bauwesen', 'verkehr', 'industrie'];

  const stormMatch = ['wasser', 'bauwesen', 'verkehr', 'industrie', 'fischerei'];

  // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  $: matches = $storyData ? [
    ...climateMatch[$storyData.zeitreihen.meta.riskzones[0]],
    ...(($storyData.zeitreihen.meta.denseSpace) ? denseMatch : notDenseMatch),
    ...(($storyData.zeitreihen.meta.hasOceanFlood) ? stormMatch : []),
    ...(($storyData.zeitreihen.meta.hasFluvialFlood) ? fluvialMatch : []),
  ].filter(onlyUnique) : [];

</script>

<div id="reading-list">
  {#if $storyData}
    <h3>Handlungsfelder für deine Region</h3>
    <ul class="highlights">
    {#each sites.filter((s) => matches.includes(s.key)) as site}
      <li><a href="{ `https://www.umweltbundesamt.de/das-handlungsfeld-${site.key}?parent=42474` }">Handlungsfeld {site.title}</a></li>
    {/each}
    </ul>
  {/if}
  <h3>Weitere Handlungsfelder für Deutschland</h3>
  <ul>
  {#each sites.filter((s) => !matches.includes(s.key)) as site}
    <li><a href="{ `https://www.umweltbundesamt.de/das-handlungsfeld-${site.key}?parent=42474` }">Handlungsfeld {site.title}</a></li>
  {/each}
  </ul>
</div>