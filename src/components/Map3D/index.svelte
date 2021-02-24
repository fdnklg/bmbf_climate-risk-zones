<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { anchors as storeAnchors } from 'stores'
  import { createGeojson, updateMapboxLayers } from './utils'
  import { mapbox, key } from './mapbox.js'
  import bbox from '@turf/bbox'

  export let data
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
        zoom: 13.1,
        center: [13.404, 52.520008],
        pitch: 45,
        bearing: 80,
        dragPan: false,
        scrollZoom: false,
        attributionControl: false,
        style: 'mapbox://styles/fdnklg/ckko1l41i69lb17nu6b6eog6i',
      })

      map.on('movestart', () => {
        flying = true
        console.log('flying', flying)
      })

      map.on('moveend', () => {
        flying = false
        var tooltip = new mapbox.Popup()
          .setLngLat(map.getCenter())
          .setHTML('<h1>Hello World!</h1>')
          .addTo(map)
        console.log('flying', flying)
      })

      map.on('load', () => {
        map.addSource('layers', { type: 'geojson', data: createGeojson() })

        // map.addSource('mapbox-dem', {
        //   type: 'raster-dem',
        //   url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        //   tileSize: 512,
        //   maxzoom: 14,
        // })
        // map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })

        // map.addLayer({
        //   id: 'riskzone_anchors',
        //   type: 'symbol',
        //   source: 'layers',
        //   // paint: {
        //   //   'fill-color': ['get', 'fill'],
        //   //   'fill-opacity': ['get', 'fill-opacity'],
        //   // },
        //   filter: ['==', 'id', 'riskzone_anchors'],
        // })

        map.addLayer({
          id: 'postcode_anchors',
          type: 'symbol',
          source: 'layers',
          layout: {
            'icon-image': 'custom-marker',
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            // 'text-offset': [3, 1.25],
          },
          // paint: {
          //   'fill-color': ['get', 'fill'],
          //   'fill-opacity': ['get', 'fill-opacity'],
          // },
          filter: ['==', 'id', 'postcode_anchors'],
        })

        map.addLayer({
          id: 'postcode_geom',
          type: 'fill',
          source: 'layers',
          paint: {
            'fill-color': ['get', 'fill'],
            'fill-opacity': ['get', 'fill-opacity'],
          },
          filter: ['==', 'id', 'postcode_geom'],
        })

        map.addLayer({
          id: 'fluvial_flood',
          type: 'fill',
          source: 'layers',
          paint: {
            'fill-color': ['get', 'fill'],
            'fill-opacity': ['get', 'fill-opacity'],
          },
          filter: ['==', 'id', 'fluvial_flood'],
        })

        map.moveLayer('fluvial_flood', 'bridge-rail')
        map.moveLayer('postcode_geom', 'bridge-rail')
      })
    }

    document.head.appendChild(link)

    return () => {
      map.remove()
      link.parentNode.removeChild(link)
    }
  })

  afterUpdate(() => {
    updateMap()
  })

  const updateMap = () => {
    if (data && map) {
      const { geojson, mapbox_layers, padding, fitBounds, anchors } = data
      let paddingBounds = padding ? padding : window.innerWidth < 500 ? 20 : 50
      let fittingBounds = fitBounds
        ? fitBounds
        : bbox(JSON.parse(JSON.stringify(geojson)))

      const layers = map.getStyle().layers

      const source = map.getSource('layers')

      const projectedAnchors = anchors.map((anchor) => map.project(anchor))
      storeAnchors.set(projectedAnchors)

      // @TODO
      // Problem: find out which anchor has the most space in the current view
      // Filter correct anchor based on project result?
      // getPosition(map, source)

      if (source) {
        source.setData(geojson)

        updateMapboxLayers(map, mapbox_layers)

        // fit map to bounding box
        const boundGeoJson = map.fitBounds(fittingBounds, {
          padding: paddingBounds,
        })
      }
    }
  }
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
