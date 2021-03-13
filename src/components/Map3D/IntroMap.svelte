<script>
  import { onMount, setContext } from 'svelte'
  import { mapbox, key } from './mapbox.js'
  import { updateMapboxLayers } from './utils'

  let map

  setContext(key, {
    getMap: () => map,
  })

  let container

  onMount(() => {
    let flying = false
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css'

    link.onload = () => {
      map = new mapbox.Map({
        container,
        zoom: 5,
        center: [10.4515, 51.1657],
        dragPan: false,
        scrollZoom: false,
        attributionControl: false,
        style: 'mapbox://styles/juli84/ckm51o5k30ztm17r1yy3oelir'
      }).fitBounds(
        [
          [5.866250351, 47.270123604],
          [15.041815657, 55.0583836],
        ],
        {
          padding: {
            top: 20,
            bottom: window.innerHeight * 0.3,
            left: 20,
            right: 20,
          },
        }
      )

      map.on('load', () => {
        map.setLayoutProperty('hochwasser', 'visibility', 'visible')
        map.addLayer(
          {
            id: 'hochwasser_line',
            type: 'line',
            source: 'composite',
            'source-layer': 'bfg-hochwasser',
            paint: {
              'line-opacity': 1,
              'line-color': '#fff',
              'line-width': 0.5,
            },
          },
          'hochwasser'
        )
      })
    }

    document.head.appendChild(link)

    return () => {
      map.remove()
      link.parentNode.removeChild(link)
    }
  })
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>
