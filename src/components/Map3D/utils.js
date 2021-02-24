import { mapbox_layers as mapbox_layers_constant } from 'constants'

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

export function calcSelectedAnchor(anchors) {
  return anchors.reduce((previous, current, currentIndex) => {
    const left = current.x
    const right = window.innerWidth - left
    const top = current.y
    const bottom = window.innerHeight - top

    const alignX = left * 2 > right ? 'right' : 'left'
    const alignY = top > bottom ? 'bottom' : 'top'

    const x = left > right ? right : left
    const y = top > bottom ? bottom : top

    const anchor = {
      alignY: x < y * 2 ? alignY : false,
      alignX: alignX,
      factor: x * 3 * y,
      x: x,
      y: y,
    }

    if (currentIndex === 1) return anchor
    if (previous.factor < anchor.factor) return anchor
    return previous
  })
  /*
          1. Überprüfe wo die position am shape liegt (links/rechts oder oben/unten).

          1. Vergleiche die Werte zu horizontalen und vertikalen Rändern und wähle jeweils den kleineren.
          2. Wähle das kleinere Wertepaar.
          3. Vergleiche die Wertepaare untereinander und wähle das wertepaar mit den höchsten Werten.
          4. Die position definiert vertikalen und horizontalen Versatz.

          5. Finales Objekt:
          {
            alignX: 'left',
            alignY: 'top',
            x: 555,
            y: 555,
          }

          rand rechts = breite - tooltip x position
          rand unten = höhe - tooltip y position
          rand oben = tooltip y position
          rand links = tooltip x position

          wenn rand links kleiner als rand rechts = 

          */
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
