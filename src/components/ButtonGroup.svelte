<script>
  import { activeKeyZeitreihe } from 'stores'
  import { zeitreiheDataKeys } from 'constants'
  import Button from 'components/Button.svelte'
</script>

<style lang="scss">
  @import 'src/style/root.scss';
</style>

<div class="buttonGroup">
  {#each zeitreiheDataKeys as d}
    <Button
      primary={d === $activeKeyZeitreihe ? false : true}
      handleClick={() => activeKeyZeitreihe.set(d)}>
      {d}
    </Button>
  {/each}
</div>
