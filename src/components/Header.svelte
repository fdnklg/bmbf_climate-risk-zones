<script>
  // import { storyData } from 'stores'
  import { content } from 'config'

  const { project } = content

  import IntroMap from 'components/Map3D/IntroMap.svelte'
  import Icon from 'components/Icon.svelte'

  // const szenarioIndices = [2, 3, 4]
  // let initial = true

  // export let duration = 6000
  // let szenarioIndex = 0
  // $: current = $storyData ? $storyData.szenarien[2] : false

  // onInterval(() => {
  //   szenarioIndex =
  //     szenarioIndex === szenarioIndices.length - 1 ? 0 : szenarioIndex + 1
  // }, duration)
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    height: 100vh;
  }

  .intro {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    position: absolute;
    bottom: 20px;

    // @include respond-max-screen-phablet {
    //   bottom: 10px;
    // }
  }

  .inner {
    width: 550px;
    margin: auto;
    text-align: center;
    padding-bottom: 40px;

    @include respond-max-screen-phablet {
      padding-bottom: 0px;
      width: calc(100% - 20px);
    }
  }
  .title {
    font-size: $font-size-xxl;
    line-height: $line-height-s;
    margin-bottom: 13px;

    @include respond-max-screen-medium {
      font-size: $font-size-l;
    }
  }

  .start {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-size: $font-size-xs;
    letter-spacing: $letter-spacing-s;
    padding-bottom: 20px;

    @include respond-max-screen-phablet {
      padding-bottom: 0px;
    }
    .label {
      padding-bottom: 5px;

      @include respond-max-screen-phablet {
        display: none;
      }
    }
  }
  .gradient {
    width: 100vw;
    max-width: 100%;
    height: 50vh;
    position: absolute;
    bottom: 0;
    /* webkit example */
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(255, 255, 255, 0)),
      to(rgba(255, 255, 255, 1)),
      color-stop(0.5, #fff)
    );

    @include respond-max-screen-phablet {
      height: 80vh;
    }
  }

  .map-wrapper {
    height: 100%;
    width: 100%;
    @include respond-max-screen-phablet {
      transform: translateY(-60px);
    }
  }
  .authors {
    font-size: $font-size-xs;
    letter-spacing: $letter-spacing-s;

    a {
      padding-bottom: 3px;
      border-bottom: 1px solid $color-main-40;
      text-decoration: none;
      color: $color-main;

      &:hover {
        opacity: 0.5;
        transition: opacity 125ms ease-in-out;
      }
    }
  }

  .text {
    color: $color-main-60;
  }
</style>

<header>
  <div class="container">
    <div class="map-wrapper">
      <IntroMap />
    </div>
    <div class="gradient" />
    <div class="intro">
      <div class="inner">
        <h1 class="title">{project.title}</h1>
        <span class="authors">von
          <a target="_blank" href="https://www.sebastianmeier.eu/">SEBASTIAN
            MEIER</a>
          und
          <a target="_blank" href="https://fabiandinklage.com">FABIAN DINKLAGE</a></span>
        <p class="text">{project.description}</p>
      </div>
      <div class="start">
        <span class="label">Starten</span>
        <Icon name="arrow_down" />
      </div>
    </div>
  </div>
</header>
