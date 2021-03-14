<script>
  import { afterUpdate } from 'svelte'

  export let text = ''
  export let url = ''
  export let hashtags = ''
  export let via = ''
  export let related = ''
  export let type = 'twitter'

  $: query = [
    text && `text=${encodeURIComponent(text)}`,
    url && `url=${encodeURIComponent(url)}`,
    hashtags && `hashtags=${hashtags}`,
    via && `via=${encodeURIComponent(via)}`,
    related && `related=${encodeURIComponent(related)}`,
  ]
    .filter(Boolean)
    .join('&')

  $: href =
    type === 'twitter'
      ? `https://twitter.com/intent/tweet?${query}`
      : `http://www.facebook.com/share.php?u=${encodeURIComponent(url)}`

  function open(e) {
    e.preventDefault()

    const w = 600
    const h = 400
    const x = (screen.width - w) / 2
    const y = (screen.height - h) / 2
    const features = `width=${w},height=${h},left=${x},top=${y}`

    window.open(href, '_blank', features)
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .share-link {
    text-decoration: none;
    border-bottom: none;
    display: flex;
    align-items: center;
    color: #080e2f;
    &:first-of-type {
      margin-right: 15px;
    }
  }
</style>

<a class="share-link" target="_blank" noreferrer {href} on:click={open}>
  <slot />
</a>
