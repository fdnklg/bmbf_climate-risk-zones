<script>
  export let data = { source: { label: '', url: '' } }
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .footer {
    padding: 0.5em 0 0 2em;
  }
  .source-label {
    font-size: $font-size-xs;
    color: $color-main-60;
  }
</style>

<div class="footer">
  <a href="https://dwd.de">Quelle: Deutscher Wetterdienst</a>
</div>
