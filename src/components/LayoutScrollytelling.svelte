<script>
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .layout-scrollytelling {
    display: flex;
    position: relative;

    @include respond-max-screen-phablet {
      flex-direction: column-reverse;
    }
  }
  .column {
    display: flex;
    flex-direction: column;
    width: calc(50% - 1em);
    margin-right: 1em;
  }

  .text {
    min-height: 100vh;

    @include respond-max-screen-phablet {
      width: 100%;
    }
  }

  .vis {
    width: 50%;
    backdrop-filter: blur(20px);
    @include respond-max-screen-phablet {
      position: sticky;
      top: 0;
      width: 100%;
    }
  }
</style>

<div class="layout-scrollytelling">
  <div class="column text">
    <slot name="text" />
  </div>
  <div class="column vis">
    <slot name="vis" />
  </div>
</div>
