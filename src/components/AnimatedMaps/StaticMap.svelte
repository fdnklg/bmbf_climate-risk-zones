<script>
  import { geoPath, geoMercator } from 'd3-geo'
  import { current_component } from 'svelte/internal'

  export let data
  export let width = 500
  export let height = 650
  export let animated = false
  export let hasStroke = true
  export let dateIndex = 0
  export let strokeWidth = 0.5
  export let stroke = '#f5f5f5'
  export let hasMarker = false
  export let colorScale = null

  $: proj = geoMercator().fitSize([width, height], data)
  $: pathGen = geoPath().projection(proj)

  $: features = data.features.map((feat, i) => {
    const d = pathGen(feat)
    const currentData = feat.properties.data
      ? feat.properties.data[dateIndex]
      : false

    const fill = currentData
      ? colorScale(currentData)
      : 'rgba(255, 255, 255, 0.7)'

    return {
      d,
      fill,
      stroke,
    }
  })

  $: marker = hasMarker ? proj(hasMarker.coordinates) : false
</script>

<style lang="scss">
  @import 'src/style/root.scss';
</style>

<svg {width} {height}>
  {#each features as feature}
    <path
      d={feature.d}
      fill={feature.fill}
      stroke-width={strokeWidth}
      stroke={hasStroke ? feature.stroke : null} />
  {/each}
  {#if marker}
    <circle cx={marker[0]} cy={marker[1]} r="1.75" fill="#080e2f" />
    <circle cx={marker[0]} cy={marker[1]} r="4" fill="none" stroke="#080e2f" />
  {/if}
</svg>
