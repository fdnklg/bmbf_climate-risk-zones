<script>
  export let data
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .labelContainer {
    top: 0;
    left: 0;
    width: 150px;
    height: 45px;
  }
  .label {
    color: black;
    position: absolute;
    width: 150px;
    transition: color 0.3s, -webkit-text-stroke 0.3s;
  }
  .outline {
    -webkit-text-stroke: 5px white;
    color: white;
    opacity: 1;
  }
</style>

<!-- <div class="tooltip-content">
  {@html data}
</div> -->

<div class="labelContainer">
  <div class="label outline">
    {@html data}
  </div>
  <div class="label">
    {@html data}
  </div>
</div>
