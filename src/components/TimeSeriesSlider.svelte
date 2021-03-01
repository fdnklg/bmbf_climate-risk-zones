<script>
  import { createEventDispatcher, afterUpdate } from 'svelte'
  export let min = 0
  export let max = 200
  export let value = 0

  const dispatch = createEventDispatcher()

  afterUpdate(() => {
    dispatch('year', value)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
</style>

<div class="time-series-chart">
  <input type="range" {min} {max} bind:value />
</div>
