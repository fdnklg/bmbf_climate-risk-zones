<script>
  import { afterUpdate } from 'svelte'
  export let anchor
  const alignClass = anchor.alignY
    ? `align-${anchor.alignY}-${anchor.alignX}`
    : `align-${anchor.alignX}`
  const layoutClass = anchor.alignY
    ? `layout-${anchor.alignY}`
    : `layout-${anchor.alignX}`
  const annotationAlignClass = anchor.alignY ? anchor.alignY : anchor.alignX

  afterUpdate(() => {
    console.log(anchor)
    console.log(
      anchor.alignX === 'right' && anchor.alignY === 'top',
      anchor.alignX === 'left' && anchor.alignY === 'top'
    )
  })
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
    border: 1px solid white;
    &.left {
      width: 45px;
      height: 1px;
      margin-left: 5px;
    }

    &.right {
      width: 45px;
      height: 1px;
      margin-right: 5px;
    }
    &.top {
      height: 45px;
      width: 1px;
      margin-top: 5px;
    }

    &.bottom {
      height: 45px;
      width: 1px;
      margin-bottom: 5px;
    }
  }

  .align-left {
    transform: translate(-100%, -50%);
  }

  .align-right {
    transform: translate(-0%, -50%);
    align-items: center;
  }

  .align-top-left {
    transform: translate(-100%, -100%);
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
    transform: translate(-100%, -50%);
  }

  .align-bottom-right {
    transform: translate(0%, -50%);
  }
</style>

<div
  style="left: {anchor.x}px; top: {anchor.y}px;"
  class="container {layoutClass} {alignClass}">
  {#if (anchor.alignX === 'left' && anchor.alignY === 'top') || (anchor.alignX === 'right' && anchor.alignY === 'top') || (anchor.alignX === 'left' && !anchor.alignY)}
    <slot />
  {/if}
  <div class="annotation-line {annotationAlignClass}" />
  {#if (anchor.alignX === 'left' && anchor.alignY === 'bottom') || (anchor.alignX === 'right' && anchor.alignY === 'bottom') || (anchor.alignX === 'right' && !anchor.alignY)}
    <slot />
  {/if}
</div>
