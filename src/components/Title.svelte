<script>
  export let alignLeft = false
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .title {
    line-height: $line-height-m;
    text-align: center;
    font-size: $font-size-xl;
    margin: auto;
    // margin-bottom: $space-l;
    margin-bottom: 13px;
    max-width: 550px;

    @include respond-max-screen-phablet {
      max-width: auto;
      line-height: $line-height-s;
      font-size: $font-size-l;
      width: calc(100% - 60px);
    }
  }
</style>

<h2 style={alignLeft ? 'text-align: left' : ''} class="title">
  <slot />
</h2>
