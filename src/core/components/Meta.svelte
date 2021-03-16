<script>
  export let meta
</script>

<svelte:head>
  <meta http-equiv="last-modified" content="{new Date().toString()}">
  <meta name="author" content="{meta.authors}">
  <meta name="description" content="{meta.description}">

  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="mask-icon" href="/safari-pinned-tab.svg">
  <meta name="msapplication-TileColor" content="#2691d5">
  <meta name="theme-color" content="#ffffff">

  <meta itemprop="name" content="{meta.title}">
  <meta itemprop="datePublished" content="2021-03-30 00:00:00 +0000">
  <meta itemprop="dateModified" content="{new Date().toString()}">
  <meta itemprop="author" content="{meta.authors}">
  <meta itemprop="publisher" content="{meta.authors}">
  <meta itemprop="headline" content="{meta.title}">
  <meta itemprop="mainEntityOfPage" content="https://www.vislab.io">
  <meta itemprop="description" content="{meta.description}">
  <meta itemprop="image" content="{meta.image}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@seb_meier">
  <meta name="twitter:title" content="{meta.title}">
  <meta name="twitter:description" content="{meta.description}">
  <meta name="twitter:creator" content="{meta.authors}">
  <meta name="twitter:image" content="{meta.image}">

  <meta property="og:title" content="{meta.title}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{meta.url}">
  <meta property="og:image" content="{meta.image}">
  <meta property="og:description" content="{meta.description}">
  <meta property="og:site_name" content="https://www.vislab.io">
  <meta property="article:published_time" content="2021-03-30 00:00:00 +0000">
  <meta property="article:modified_time" content="{new Date().toString()}">

</svelte:head>