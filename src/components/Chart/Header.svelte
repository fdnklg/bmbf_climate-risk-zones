<script>
  export let data
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .chart-headline {
    margin-bottom: 0;
    font-size: var(--font-size-xl);
    line-height: var(--line-height-m);
    color: $color-main;
  }

  .chart-subtitle {
    font-size: var(--font-size-m);
    color: var(--color-grey-0);
    line-height: var(--line-height-l);
    margin: 0;
  }
</style>

<div class="chart-headline">
  <h2 class="chart-headline">{data.title}</h2>
  {#if data.subtitle}
    <p class="chart-subtitle">{data.subtitle}</p>
  {/if}
</div>
