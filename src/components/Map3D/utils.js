import { mapbox_layers as mapbox_layers_constant } from 'constants'
import difference from 'turf-difference'
import bboxPolygon from '@turf/bbox-polygon'

export const createBoundingBox = (cutOutFeat) => {
  let bboxEurope = [-5.2288281645, 42.0255985816, 25.622332041, 58.9956007543]
  // let bboxEurope = [-430.3125, -85.513398, 443.671875, 85.051129]
  let bboxEuropeFeat
  console.log('bboxPolygon', bboxPolygon, cutOutFeat)
  bboxEuropeFeat = difference(bboxPolygon.default(bboxEurope), cutOutFeat)

  return {
    type: 'Feature',
    properties: {
      id: 'postcode_buff_geom-mask',
      fill: '#fff',
      'fill-opacity': 0.85,
      'stroke-opacity': 0,
    },
    geometry: {
      type: 'Polygon',
      coordinates: bboxEuropeFeat ? bboxEuropeFeat.geometry.coordinates : [],
    },
  }
}

export const createGeojson = () => {
  return {
    type: 'FeatureCollection',
    features: [],
  }
}

export const createFeature = (geom, properties) => {
  return {
    type: 'Feature',
    properties: properties,
    geometry: geom,
  }
}

function percDiff(a, b) {
  return 100 * Math.abs((a - b) / ((a + b) / 2))
}

export function calcSelectedAnchor(anchors) {
  let filteredAnchors = []
  const minOffsetX = 150
  const minOffsetY = 200

  anchors.forEach((anchor, i) => {
    const { x, y } = anchor
    const left = x
    const right = window.innerWidth - left
    const top = y
    const bottom = window.innerHeight - top
    if (
      (left > minOffsetX || right > minOffsetX) &&
      (top > minOffsetY || bottom > minOffsetY)
    ) {
      const alignX = left * 1.2 < right ? 'left' : 'right'
      const alignY = bottom > top ? 'top' : 'bottom'

      const factorX = left > right ? left : right
      const factorY = top > bottom ? top : bottom

      const newAnchor = {
        alignY: percDiff(top, bottom) < 30 ? false : alignY,
        alignX,
        factor: factorX * factorY,
        x,
        y,
        dimensions: {
          left,
          right,
          top,
          bottom,
        },
      }
      filteredAnchors.push(newAnchor)
    }
  })

  const max = filteredAnchors.reduce((prev, current) => {
    return prev.factor < current.factor ? prev : current
  })
  return max
}

export function rotateCamera(map, timestamp) {
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 100) % 360, { duration: 0 })
  // Request the next frame of the animation.
  requestAnimationFrame(rotateCamera)
}

export const updateMapboxLayers = (map, mapbox_layers) => {
  mapbox_layers_constant.forEach((layer) => {
    map.setLayoutProperty(layer, 'visibility', 'none')
  })

  if (mapbox_layers.length > 0) {
    mapbox_layers.forEach((layer) => {
      map.setLayoutProperty(layer, 'visibility', 'visible')
    })
  }
}

export function getFittingBounds(data) {
  // bbox(JSON.parse(JSON.stringify(geojson)));
}

export function addLayer(map, id, type, source, paint) {
  map.addLayer({
    id: id,
    type: type,
    source: source,
    paint: paint,
    filter: ['==', 'id', id],
  })
}

// const parse = (str, delimiter) => {
//   const csv = dsvFormat(delimiter)
//   const parsed = csv.parse(str)
//   return parsed.columns
// }
