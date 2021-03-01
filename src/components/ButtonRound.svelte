<script>
  export let handleClick
  export let type = 'play'

  $: isPlay = type === 'play'
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
    border-radius: 100%;
    color: white;
    height: 40px;
    width: 40px;
    cursor: pointer;
    border: 1px solid $color-main-20;
    opacity: 1;
    transition: all 0.125s ease-in-out;
    @include box-shadow-btn;

    &:hover {
      opacity: 0.6;
    }

    &.play {
      background-image: url('/icons/icon-play.svg');
      background-repeat: no-repeat;
      background-position: center;
    }

    &.pause {
      background-image: url('/icons/icon-pause.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>

<button on:click={handleClick} class="button {isPlay ? 'play' : 'pause'}">
  <slot />
</button>
