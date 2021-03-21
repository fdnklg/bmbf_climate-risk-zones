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
    background: rgba(255, 255, 255, 0.95);
    @include respond-max-screen-phablet {
      box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.01),
        0 2px 2px rgba(0, 0, 0, 0.0174351), 0 4px 4px rgba(0, 0, 0, 0.0200741),
        0 10px 8px rgba(0, 0, 0, 0.0299982),
        0 15px 15px rgba(0, 0, 0, 0.0296004),
        0 30px 30px rgba(0, 0, 0, 0.0309366), 0 70px 65px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      width: 100%;
      padding-bottom: 20px;
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
