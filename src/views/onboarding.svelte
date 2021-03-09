<script>
  import Input from 'components/Input.svelte'
  import Tile from 'components/Tile/Tile.svelte'
  import TileParagraph from 'components/Tile/TileParagraph.svelte'

  const inputClass = 'onboarding-input'
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    margin: auto;
    margin-bottom: 100px;

    @include respond-max-screen-phablet {
      width: calc(100% - 40px);
    }
  }

  .wrapper {
    width: 100%;
  }
</style>

<div class="onboarding container">
  <Tile large={true} active={true}>
    <div class="wrapper">
      <TileParagraph
        subtitleClassname="input-hint"
        title="Für welche Region interessierst du dich?"
        subtitle="Gib <strong>deine Postleitzahl ein und bestätige.</strong> Oder fahre mit einer <strong>zufälligen
      Postleitzahl</strong> fort." />
      <Input className={inputClass} />
    </div>
  </Tile>
</div>
