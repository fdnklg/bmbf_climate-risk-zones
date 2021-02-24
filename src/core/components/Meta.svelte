<script>
  export let meta
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang={meta.lang} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content={meta.twitter_site} />
  <meta name="twitter:creator" content={meta.twitter_creator} />
  <meta property="og:url" content={meta.og_url} />
  <meta property="og:title" content="A Twitter for My Sister" />
  <meta property="og:description" content={meta.og_description} />
  <meta property="og:image" content={meta.og_image} />
</svelte:head>
