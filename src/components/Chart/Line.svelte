<script>
  import { line, curveCardinal } from 'd3-shape'
  import { getChartContext } from './Chart.svelte'
  import { default_x, default_y } from './utils'
  const { x_scale, y_scale } = getChartContext()
  export let data
  export let x = default_x
  export let y = default_y

  const d3Line = line().curve(curveCardinal.tension(0.5))
  $: d = d3Line(data.map((d, i) => [$x_scale(x(d, i)), $y_scale(y(d, i))]))
</script>

<slot {d} />
