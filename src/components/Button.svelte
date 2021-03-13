<script>
  export let handleClick
  export let primary = true
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  global {
    .disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  button {
    border: 0;
    background-color: transparent;
  }
  .button {
    border-radius: 100px;
    color: white;
    padding: 12px 20px;
    width: fit-content;
    cursor: pointer;
    opacity: 1;
    transition: all 0.125s ease-in-out;

    &:hover {
      opacity: 0.6;
    }

    &.primary {
      background-color: $color-main;
      margin-right: 20px;

      @include respond-max-screen-phablet {
        margin-right: 10px;
      }
    }

    &.secondary {
      // border-bottom: 1px solid $color-main;
      padding: 0 0 3px 0;
      color: $color-main;
      height: fit-content;
      border-radius: 0;
    }
  }
</style>

<button
  on:click={handleClick}
  class="button {primary ? 'primary' : 'secondary'}">
  <slot />
</button>
