import { mapbox_layers as mapbox_layers_constant } from 'constants'
// import { dsvFormat } from 'd3-dsv'
// import union from '@turf/union'
// import unkinkPolygon from '@turf/unkink-polygon'
// import kinks from '@turf/kinks'
// import difference from 'turf-difference'
// import bboxPolygon from '@turf/bbox-polygon'

// export const createBoundingBox = (cutOutFeat) => {
//   let united = false
//   if (cutOutFeat && cutOutFeat.length > 1) {
//     cutOutFeat = cutOutFeat.map((feat) => {
//       var kink = kinks.default(feat)

//       if (kink.features.length) {
//         const polys = unkinkPolygon(feat)
//         return polys.features[0]
//       }

//       return feat
//     })
//     united = union.default(...cutOutFeat)
//   }

//   let bboxEurope = [-5.2288281645, 42.0255985816, 25.622332041, 58.9956007543]
//   let bboxEuropeFeat
//   if (united) {
//     bboxEuropeFeat = difference(bboxPolygon.default(bboxEurope), united)
//   }

//   return {
//     type: 'Feature',
//     properties: {
//       fill: '#fff',
//       'fill-opacity': 0.85,
//       'stroke-opacity': 0,
//     },
//     geometry: {
//       type: 'Polygon',
//       coordinates: united ? bboxEuropeFeat.geometry.coordinates : [],
//     },
//   }
// }

// export const createCircle = (center, radiusInKm, style) => {
//   const points = 64

//   const coords = {
//     latitude: center[1],
//     longitude: center[0],
//   }

//   const km = radiusInKm

//   const ret = []
//   const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180))
//   const distanceY = km / 110.574

//   let theta, x, y
//   for (let i = 0; i < points; i++) {
//     theta = (i / points) * (2 * Math.PI)
//     x = distanceX * Math.cos(theta)
//     y = distanceY * Math.sin(theta)

//     ret.push([coords.longitude + x, coords.latitude + y])
//   }
//   ret.push(ret[0])

//   return {
//     type: 'Feature',
//     properties: style,
//     geometry: {
//       type: 'Polygon',
//       coordinates: [ret],
//     },
//   }
// }

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

// const parse = (str, delimiter) => {
//   const csv = dsvFormat(delimiter)
//   const parsed = csv.parse(str)
//   return parsed.columns
// }
