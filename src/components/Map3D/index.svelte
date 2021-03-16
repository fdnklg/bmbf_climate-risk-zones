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
  let isMoving = false

  setContext(key, {
    getMap: () => map,
  })

  let container

  onMount(() => {
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
        style: 'mapbox://styles/juli84/ckm51o5k30ztm17r1yy3oelir',
      })

      map.on('movestart', () => {
        isMoving = true
        if (isMoving) selectedAnchors.set([])
      })

      map.on('moveend', () => {
        isMoving = false
        if (data && !isMoving) {
          let { anchors } = data
          if (anchors.length > 0) {
            let projectedAnnotations = []
            console.log('anchors', anchors)
            anchors.forEach((anchor) => {
              const { anchors } = anchor
              const projectedCoords = anchors.map((anchor) =>
                map.project(anchor)
              )
              // @TODO: update method to calculate selected anchor here!
              const selectedAnchor = calcSelectedAnchor(projectedCoords)
              anchor.coords = selectedAnchor
              projectedAnnotations.push(anchor)
            })
            selectedAnchors.set(projectedAnnotations)
          }
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

        addLayer(map, 'fluvial_flood-fill-L', 'fill', 'layers', paintFill)
        addLayer(map, 'fluvial_flood-fill-M', 'fill', 'layers', paintFill)
        addLayer(map, 'fluvial_flood-fill-H', 'fill', 'layers', paintFill)

        addLayer(
          map,
          'fluvial_flood-contour-L',
          'line',
          'layers',
          paintLineFluvialFlood
        )
        addLayer(
          map,
          'fluvial_flood-contour-M',
          'line',
          'layers',
          paintLineFluvialFlood
        )
        addLayer(
          map,
          'fluvial_flood-contour-H',
          'line',
          'layers',
          paintLineFluvialFlood
        )

        map.moveLayer('postcode_geom-fill', 'state-label')
        map.moveLayer('postcode_geom-contour', 'state-label')
        map.moveLayer('postcode_buff_geom-fill', 'state-label')
        map.moveLayer('postcode_buff_geom-contour', 'state-label')
        map.moveLayer('postcode_buff_geom-mask', 'state-label')
        map.moveLayer('fluvial_flood-fill-L', 'state-label')
        map.moveLayer('fluvial_flood-contour-L', 'state-label')
        map.moveLayer('fluvial_flood-fill-M', 'state-label')
        map.moveLayer('fluvial_flood-contour-M', 'state-label')
        map.moveLayer('fluvial_flood-fill-H', 'state-label')
        map.moveLayer('fluvial_flood-contour-H', 'state-label')
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
      const { geojson, padding, fitBounds, risk_zone_ids, layers } = data
      let paddingBounds = padding ? padding : window.innerWidth < 500 ? 20 : 70

      const mapbox_layers = layers.filter((d) => d.isMapbox).map((d) => d.key)

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
          duration: 600,
        })

        if (mapbox_layers.includes('klimazonen')) {
          map.setFilter('klimazonen', [
            'match',
            ['get', 'fid'],
            risk_zone_ids,
            true,
            false,
          ])
        }
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
