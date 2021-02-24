<script>
  import search from '../../icons/search.svg'
  import valid from '../../icons/valid.svg'
  import invalid from '../../icons/invalid.svg'
  import arrow_down from '../../icons/arrow_down.svg'
  import twitter from '../../icons/twitter.svg'
  import facebook from '../../icons/facebook.svg'

  export let name = 'search'

  const icons = {
    search,
    valid,
    twitter,
    facebook,
    invalid,
    arrow_down,
  }
</script>

<style lang="scss">
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<span class="icon {name}">
  {@html icons[name]}
</span>
