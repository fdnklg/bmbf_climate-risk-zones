<script>
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .title {
    line-height: $line-height-m;
    font-size: $font-size-xl;
    margin: auto;
    // margin-bottom: $space-l;
    margin-bottom: 13px;
    max-width: 550px;

    @include respond-max-screen-phablet {
      // text-align: center;
      max-width: auto;
      line-height: $line-height-m;
      font-size: $font-size-l;
    }
  }
</style>

<h2 class="title">
  <slot />
</h2>
