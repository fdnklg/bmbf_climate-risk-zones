<script>
  import { afterUpdate } from 'svelte'
  export let position
  afterUpdate(() => {
    console.log(position.y, position.x)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    position: absolute;
    z-index: 10;
    width: 50px;
    height: 50px;
    // border: 1px solid black;
  }
</style>

<div style="left: {position.x}px; top: {position.y}px;" class="container">
  <slot />
</div>
