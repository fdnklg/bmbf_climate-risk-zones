<script>
  export let anchor
  $: alignClass = anchor.alignY
    ? `align-${anchor.alignY}-${anchor.alignX}`
    : `align-${anchor.alignX}`
  $: layoutClass = anchor.alignY
    ? `layout-${anchor.alignY}`
    : `layout-${anchor.alignX}`
  $: annotationAlignClass = anchor.alignY ? anchor.alignY : anchor.alignX
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    position: absolute;
    z-index: 10;
    display: flex;
    align-items: center;

    &.layout-top,
    &.layout-bottom {
      flex-direction: column;
    }
  }

  .annotation-line {
    background-color: black;
    outline: 1px solid white;
    box-sizing: content-box;
    &.left {
      width: 35px;
      height: 1px;
      margin-left: 5px;
    }

    &.right {
      width: 35px;
      height: 1px;
      margin-right: 5px;
    }
    &.top {
      height: 35px;
      width: 1px;
      margin-top: 5px;
    }

    &.bottom {
      height: 35px;
      width: 1px;
      margin-bottom: 5px;
    }
  }
  .align-left {
    text-align: right;
    transform: translate(-100%, -50%);
  }
  .align-right {
    transform: translate(0%, -50%);
    align-items: center;
  }
  .align-top-left {
    transform: translate(-100%, -100%);
    text-align: right;
    .annotation-line {
      align-self: flex-end;
    }
  }

  .align-top-right {
    transform: translate(0%, -100%);
    .annotation-line {
      align-self: flex-start;
    }
  }
  .align-bottom-left {
    text-align: right;
    transform: translate(-100%, 0%);
    .annotation-line {
      align-self: flex-end;
    }
  }
  .align-bottom-right {
    transform: translate(0%, 0%);
    .annotation-line {
      align-self: flex-start;
    }
  }

  .dot {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: black;
  }
</style>

<!-- <div class="dot" style="left: {anchor.x}px; top: {anchor.y}px;" /> -->

<div
  style="left: {anchor.x}px; top: {anchor.y}px;"
  class="container {layoutClass} {alignClass}">
  {#if alignClass === 'align-top-right' || alignClass === 'align-top-left' || alignClass === 'align-left'}
    <slot align={anchor.alignX} />
  {/if}
  <div class="annotation-line {annotationAlignClass}" />
  {#if alignClass === 'align-bottom-right' || alignClass === 'align-bottom-left' || alignClass === 'align-right'}
    <slot align={anchor.alignX} />
  {/if}
</div>
