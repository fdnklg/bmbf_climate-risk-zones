<script>
  export let data
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .tooltip-content {
    position: relative;
    font-size: $font-size-s;
    line-height: $font-size-s * 1.1;
    text-shadow: -1px -1px 0 rgba(255, 255, 255, 0.8),
      0 -1px 0 rgba(255, 255, 255, 0.8), 1px -1px 0 rgba(255, 255, 255, 0.8),
      1px 0 0 rgba(255, 255, 255, 0.8), 1px 1px 0 rgba(255, 255, 255, 0.8),
      0 1px 0 rgba(255, 255, 255, 0.8), -1px 1px 0 rgba(255, 255, 255, 0.8),
      -1px 0 0 rgba(255, 255, 255, 0.8);
  }
</style>

<div class="tooltip-content">
  {@html data}
</div>
