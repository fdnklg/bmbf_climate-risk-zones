<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { selectedAnchors } from 'stores'
  import {
    createGeojson,
    updateMapboxLayers,
    calcSelectedAnchor,
    addLayer,
  } from './utils'

  import {
    paintFill,
    paintLine,
    paintLineBuff,
    paintLineFluvialFlood,
  } from './constants'
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
        // pitch: 45,
        // bearing: 80,
        dragPan: false,
        scrollZoom: false,
        attributionControl: false,
        style: 'mapbox://styles/fdnklg/ckko1l41i69lb17nu6b6eog6i',
      })

      map.on('movestart', () => {
        flying = true
        selectedAnchors.set([])
      })

      map.on('moveend', () => {
        flying = false
        if (data) {
          setTimeout(() => {
            const { anchors } = data
            if (anchors.length > 0) {
              // calc projected coords for annotation lat/lng coords
              let projectedAnnotations = []
              anchors.forEach((anchor) => {
                const { anchors } = anchor
                const projectedCoords = anchors.map((anchor) =>
                  map.project(anchor)
                )
                const selectedAnchor = calcSelectedAnchor(projectedCoords)
                anchor.coords = selectedAnchor
                projectedAnnotations.push(anchor)
              })
              selectedAnchors.set(projectedAnnotations)
            }
          }, 100)
        }
      })

      map.on('load', () => {
        map.addSource('layers', { type: 'geojson', data: createGeojson() })

        addLayer(map, 'postcode_buff_geom-fill', 'fill', 'layers', paintFill)
        addLayer(
          map,
          'postcode_buff_geom-contour',
          'line',
          'layers',
          paintLineBuff
        )

        addLayer(map, 'postcode_buff_geom-mask', 'fill', 'layers', paintFill)
        addLayer(map, 'postcode_geom-fill', 'fill', 'layers', paintFill)
        addLayer(map, 'postcode_geom-contour', 'line', 'layers', paintLine)

        addLayer(map, 'fluvial_flood-fill', 'fill', 'layers', paintFill)
        addLayer(
          map,
          'fluvial_flood-contour',
          'line',
          'layers',
          paintLineFluvialFlood
        )

        map.moveLayer('fluvial_flood-fill', 'state-label')
        map.moveLayer('fluvial_flood-contour', 'state-label')
        map.moveLayer('postcode_geom-fill', 'state-label')
        map.moveLayer('postcode_geom-contour', 'state-label')
        map.moveLayer('postcode_buff_geom-fill', 'state-label')
        map.moveLayer('postcode_buff_geom-contour', 'state-label')
        map.moveLayer('postcode_buff_geom-mask', 'state-label')
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
      const source = map.getSource('layers')

      if (source) {
        source.setData(geojson)
        updateMapboxLayers(map, mapbox_layers)
        // fit map to bounding box
        const boundGeoJson = map.fitBounds(fittingBounds, {
          padding: paddingBounds,
          duration: 500,
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
