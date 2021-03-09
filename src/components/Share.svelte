<script>
  import Icon from 'components/Icon.svelte'
  import TwitterShare from 'components/TwitterShare.svelte'
  import Tile from 'components/Tile/Tile.svelte'

  const Icons = [
    {
      name: 'twitter',
      text: 'Der Text zum Projekt',
      url: 'https://fabiandinklage.com',
    },
    {
      name: 'facebook',
      url: 'https://fabiandinklage.com',
    },
  ]
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    display: flex;
    top: $space-l;
    width: 100%;
    justify-content: column;
    right: $space-l;
    align-items: center;
  }
  .label {
    padding-right: 5px;
    color: $color-main-60;
  }

  .title {
    font-size: $font-size-l;
    margin: 5px 0;
  }

  .share-label {
    padding-left: 10px;
  }

  .icons {
    margin: 10px 0 0 0;
    display: flex;
  }

  .icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 50%;
    background-color: $color-main;

    &:hover {
      background-color: $color-main-60;
      @include transition-s;
    }
  }
</style>

<div class="social container">
  <Tile small={true} full={true} active={true}>
    <h3 class="title">Hat dir der Artikel gefallen?</h3>
    <span class="label">Dann teile ihn mit deinen Freunden</span>
    <div class="icons">
      {#each Icons as d}
        <TwitterShare type={d.name} text={d.text} url={d.url} via={d.via}>
          <div class="icon">
            <Icon name={d.name} />
          </div>
          <span class="share-label">{d.name}</span>
        </TwitterShare>
      {/each}
    </div>
  </Tile>
</div>
