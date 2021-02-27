<script>
  import { geoPath, geoMercator } from 'd3-geo'
  import { getColorScale } from './utils'

  export let data
  export let width = 500
  export let height = 650
  export let animated = false
  export let hasStroke = true
  export let dateIndex = 0

  const proj = geoMercator().fitSize([width, height], data.kreise)
  const pathGen = geoPath().projection(proj)

  const colorScale = getColorScale([0, 150])

  $: features = data.kreise.features.map((feat, i) => {
    const d = pathGen(feat)
    const currentData = feat.properties.data[dateIndex]

    const fill = currentData ? colorScale(currentData) : '#fff'
    const stroke = hasStroke ? '#f5f5f5' : 'none'

    return {
      d,
      fill,
      stroke,
    }
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
</style>

<div class="static-map">
  <svg {width} {height}>
    {#each features as feature}
      <path
        d={feature.d}
        fill={feature.fill}
        stroke-width=".5"
        stroke={feature.stroke} />
    {/each}
  </svg>
</div>
