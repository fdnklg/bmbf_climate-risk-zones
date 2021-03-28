<script>
  import { createEventDispatcher } from 'svelte'
  export let postcodes = false

  const dispatch = createEventDispatcher()

  const handleClick = (postcode) => dispatch('postcode', postcode)
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .label {
    color: $color-main-60;
  }
  .postcode {
    color: white;
    padding-right: 2px;
    font-family: $font-bold;
    color: $color-main;
  }
  .btn {
    background-color: $color-main-10;
    padding: 6px 12px 8px 12px;
    margin: 0 7px 7px 0;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    transition: all 0.125s ease-in-out;

    &:hover {
      background-color: $color-main-20;
    }
  }
  .headline {
    color: $color-main;
    // font-family: $font-bold;
    display: block;
    margin: 15px 0 5px 0;
  }
</style>

<div class="example-searches">
  {#if postcodes}
    <span class="headline">Beispielgebiete:</span>
    {#each postcodes as d}
      <button on:click={() => handleClick(d.postcode)} class="btn">
        <span class="postcode">{d.postcode}</span>
        <span class="label">{d.label}</span>
      </button>
    {/each}
  {/if}
</div>
