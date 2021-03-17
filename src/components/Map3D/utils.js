import { mapbox_layers as mapbox_layers_constant } from 'constants'
import difference from 'turf-difference'
import bboxPolygon from '@turf/bbox-polygon'
import { csvFormatBody } from 'd3-dsv'

export const createBoundingBox = (cutOutFeat) => {
  let bboxEurope = [-5.2288281645, 42.0255985816, 25.622332041, 58.9956007543]
  // let bboxEurope = [-430.3125, -85.513398, 443.671875, 85.051129]
  let bboxEuropeFeat
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

export function setAlignedAnnotations(annotations, innerWidth, innerHeight) {
  const annotationsCopy = JSON.parse(JSON.stringify(annotations))
  // loop über jede annotation
  annotations.forEach((annotation, i) => {
    const { coords } = annotation
    // für jede annotation: loop über alle anderen annotationen und berechne:
    annotationsCopy.map((comparedAnnotation, cI) => {
      const coordsToCompare = comparedAnnotation.coords
      const labelWidth = 160
      const labelHeight = 100
      if (i !== cI) {
        // - wenn differenz zu mindestens einem x < als 150 dann setze align in andere Richtung

        if (
          coords.x > coordsToCompare.x &&
          coords.x - coordsToCompare.x > labelWidth
        ) {
          coords.alignX = 'right'
        } else if (coords.x < labelWidth) {
          coords.alignX = 'right'
        } else if (
          coords.x < coordsToCompare.x &&
          coordsToCompare.x - coords.x < labelWidth &&
          coords.x > labelWidth &&
          innerWidth - coords.x < labelWidth
        ) {
          coords.alignX = 'left'
        } else if (innerWidth - coords.x < labelWidth) {
          coords.alignX = 'left'
        }

        if (
          coords.y < coordsToCompare.y &&
          (coords.x < labelWidth || innerWidth - coords.x < innerWidth) &&
          coords.y > labelHeight
        ) {
          coords.alignY = 'top'
        }

        if (
          coords.y > coordsToCompare.y &&
          (coords.x < labelWidth || innerWidth - coords.x < innerWidth) &&
          coords.y > labelHeight
        ) {
          coords.alignY = 'bottom'
        }

        if (innerWidth > 768) {
          coords.alignY = false
        }

        if (
          coords.x > coordsToCompare.x &&
          coords.x - coordsToCompare.x < labelWidth &&
          coords.y > coordsToCompare.y
        ) {
          coords.alignY = 'bottom'
        }

        if (
          coords.x > coordsToCompare.x &&
          coords.x - coordsToCompare.x < labelWidth &&
          coords.y < coordsToCompare.y
        ) {
          coords.alignY = 'top'
        }
      }
    })
  })
  return annotations
}

export function calcSelectedAnchor(anchors, mode) {
  let filteredAnchors = []
  const minOffsetX = 150
  const minOffsetY = 200

  const factor = mode === 'postcode_geom' ? 2 : 1

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
      const alignX = left < right ? 'left' : 'right'
      const alignY = bottom > top ? 'top' : 'bottom'

      const factorX = left > right ? left : right
      const factorY = top * factor > bottom ? top : bottom

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
  let max = filteredAnchors
  if (filteredAnchors.length > 1) {
    max = filteredAnchors.reduce((prev, current) => {
      return prev.factor < current.factor ? prev : current
    })
  }

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
