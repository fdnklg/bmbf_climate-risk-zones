<script>
  export let title
  export let subtitle
  export let subtitleClassname = ''
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .intro {
    @include respond-max-screen-phablet {
      text-align: center;
    }
  }
  .title {
    font-size: $font-size-l;
    color: $color-main;
    margin-bottom: 0px;
    margin-top: 0px;
    line-height: $line-height-m;

    @include respond-max-screen-phablet {
      font-size: 21px;
    }
  }

  .subtitle {
    font-size: $font-size-s;
    letter-spacing: $letter-spacing-s;
    line-height: 150%;
    color: $color-main-60;
    margin-top: 0px;
    margin-bottom: 20px;

    @include respond-max-screen-phablet {
      font-size: 14px;
    }
  }
</style>

<div class="intro">
  <h2 class="title">{title}</h2>
  <p class="subtitle {subtitleClassname}">
    {@html subtitle}
  </p>
</div>
