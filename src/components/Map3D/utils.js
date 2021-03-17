import { mapbox_layers as mapbox_layers_constant } from 'constants'
import difference from 'turf-difference'
import bboxPolygon from '@turf/bbox-polygon'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import distance from '@turf/distance'

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

export function pointInPolygon(point, polygon, align) {
  const offset = 0.011
  let annotatedPoint
  switch (align) {
    case 'left':
      annotatedPoint = [point[0] - offset, point[1]]
      break
    case 'right':
      annotatedPoint = [point[0] + offset, point[1]]
      break
    case 'top':
      annotatedPoint = [point[0], point[1] + offset]
      break
    case 'bottom':
      annotatedPoint = [point[0], point[1] - offset]
      break
  }
  return booleanPointInPolygon(annotatedPoint, polygon)
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
        if (innerWidth - coords.x < labelWidth) {
          coords.alignX = 'left'
        } else if (
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

/*

- berechne die distanze zwischen allen punkten
- wähle das Set aus Punkten aus, dass insgesamt die größte distanze zueinander hat

*/

export function calcSelectedAnchor(anchors, mode) {
  let filteredAnchors = []
  const minOffsetX = 150
  const minOffsetY = 200

  const factor = mode === 'postcode_buff_geom' ? 2 : 1

  anchors.forEach((anchor, i) => {
    const { pos, coords } = anchor
    const { x, y } = pos
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
        coords,
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

export function calcSelectedAnchorNew(anchors, mode) {
  let filteredAnchors = []
  const minOffsetX = 150
  const minOffsetY = 200

  const factor = mode === 'postcode_buff_geom' ? 2 : 1

  anchors.forEach((anchor, i) => {
    const { pos, coords, id } = anchor
    const { x, y } = pos
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
        coords,
        id,
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
  return filteredAnchors
}

export function getSelectedCoords(anchors) {
  const getKey = (previous, current, index, array) => {
    if (!previous.includes(current.id)) previous.push(current.id)
    return previous
  }
  const keys = anchors.reduce(getKey, [])

  const getLargestDistance = (previous, current, index, array) => {
    const distances = []
    array.forEach((d, i) => {
      if (d.id !== current.id) {
        distances.push({
          distance: distance(current.coords, d.coords),
          id: current.id === 'klimazonen' ? current.klimaId : current.id,
          from: current.id === 'klimazonen' ? current.klimaId : current.id,
          to: d.id,
          fromIndex: index,
          toIndex: i,
        })
      }
    })
    const largest = distances.reduce((prev, current) => {
      return prev.distance > current.distance ? prev : current
    })

    let storeObj = previous.find((d) => d.key === largest.id)

    if (!storeObj.anchor) storeObj.anchor = largest
    if (storeObj.anchor && largest.distance > storeObj.anchor.distance)
      storeObj.anchor = largest
    return previous
  }

  const largesDistancePairs = anchors.reduce(
    getLargestDistance,
    keys.map((d) => ({ key: d, anchor: null }))
  )

  let selectedAnchors = []

  largesDistancePairs.forEach((d) => {
    selectedAnchors.push(anchors[d.anchor.fromIndex])
  })

  return calcSelectedAnchorNew(selectedAnchors)
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
