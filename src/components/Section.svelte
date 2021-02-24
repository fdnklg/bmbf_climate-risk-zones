<script>
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .section {
    font-size: $font-size-m;
    line-height: $line-height-l;
    margin: 3em auto;

    @include respond-max-screen-phablet {
      margin: 2em auto;
    }
  }
</style>

<div class="section inner">
  <slot />
</div>
