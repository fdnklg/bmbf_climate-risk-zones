<script>
  export let active
  export let full = false
  export let large = false
  export let isMap = false
  export let small = false
  export let isLast = false
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .tile {
    opacity: 0.5;
    padding: 15px;
    border: 1px solid transparent;
    margin: auto;
    max-width: 550px;
    z-index: 20;
    box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.01),
      0 2px 2px rgba(0, 0, 0, 0.0174351), 0 4px 4px rgba(0, 0, 0, 0.0200741),
      0 10px 8px rgba(0, 0, 0, 0.0299982), 0 15px 15px rgba(0, 0, 0, 0.0296004),
      0 30px 30px rgba(0, 0, 0, 0.0309366), 0 70px 65px rgba(0, 0, 0, 0.05);
    @include transition-m;

    @include respond-max-screen-phablet {
      padding: 10px;
    }
  }

  .isLast {
    margin-bottom: 25vh;
  }

  .map {
    opacity: 0;
  }
  .large {
    padding: 45px;

    @include respond-max-screen-phablet {
      padding: 15px;
    }
  }
  .full {
    width: 100%;
  }
  .small {
    width: calc(100% - 40px);
  }

  .active {
    opacity: 0.999;
    background-image: linear-gradient(to top left, #f6f8f9, white);
    border: 1px solid $color-tile;
    border-radius: $border-radius-m;
    @include transition-m;
  }
</style>

<div
  class="tile {isLast ? 'isLast' : ''} {small ? 'small' : ''} {active ? 'active' : ''} {large ? 'large' : ''} {isMap ? 'map' : ''} {full ? 'full' : ''}">
  <slot />
</div>
