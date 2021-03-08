<script>
  import Box from './Box.svelte'

  export let data
  export let width = 1
  export let x = (d) => d.x
  export let y1 = (d) => d.y1
  export let y2 = (d) => d.y2
  export let animated = false
  export let index = 0
</script>

{#each data as d, i}
  <Box
    {animated}
    {index}
    x1={x(d, i) - width / 2}
    x2={x(d, i) + width / 2}
    y1={y1(d, i)}
    y2={y2(d, i)}>
    <slot value={d} first={i === 0} last={i === data.length - 1} />
  </Box>
{/each}
