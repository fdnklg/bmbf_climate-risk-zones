<script>
  import Icon from 'components/Icon.svelte'
  export let data
  export let flip = false

  $: pos = 100 - data.x
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .annotation {
    bottom: auto;
    top: 20px;
    position: absolute;
    transform: translate(-3px, 10px);
    font-size: $font-size-xs;
    color: $color-main;
    width: auto;
    display: flex;
    padding-right: 5px;

    &.flip {
      bottom: 34px;
      top: auto;
    }
  }

  .tip {
    position: absolute;
    content: '';
    display: inline-block;
    width: auto;
    height: 0;
    position: absolute;
    bottom: auto;
    top: 7px;
    border-bottom: 4px solid $color-main;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    z-index: 100;
    &.left {
      left: 1px;
    }

    &.right {
      right: 4px;
    }
  }

  .right {
    transform: translate(8px, -2px);
  }

  .left {
    transform: translate(-3px, -2px);
  }

  .label {
    margin-bottom: 15px;
    line-height: $line-height-m;
  }

  .iconWrapper {
    height: 15px;
  }

  .flipped {
    border-top: 4px solid $color-main;
    border-bottom: 0px;
    bottom: 10px;
    top: auto;
    /* transform: translateY(5px); */
  }
</style>

<div
  style="
    {data.align}: {data.align === 'left' ? 100 - pos : pos}%;
    text-align: {data.align === 'right' ? 'right' : 'left'};"
  class="annotation {flip ? 'flip' : ''}">
  {#if data.icon}
    <Icon name={data.icon} />
  {/if}
  <p class="label {data.align}">
    {@html data.label}
  </p>
  <div class="tip {data.align} {flip ? 'flipped' : ''}" />
</div>
