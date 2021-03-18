<script>
  export let data = { label: '', url: '' }
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .source {
    padding-bottom: 0.5em;
  }
  .source-label {
    font-size: $font-size-xs;
    color: $color-main-60;
  }
</style>

<div class="source"><a href={data.url}>Quelle: {data.label}</a></div>
