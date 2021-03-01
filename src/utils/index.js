import { dsvFormat } from 'd3-dsv'
import { extent } from 'd3-array'
import { zeitreiheDataGradients as gradient, styles } from 'constants'
import { feature, mesh, merge } from 'topojson-client'
import { createFeature } from 'components/Map3D/utils.js'
import { STATE_LABELS, stateCentroids } from 'constants'

export function range(start, end, step = 1) {
  // Test that the first 3 arguments are finite numbers.
  // Using Array.prototype.every() and Number.isFinite().
  const allNumbers = [start, end, step].every(Number.isFinite)

  // Throw an error if any of the first 3 arguments is not a finite number.
  if (!allNumbers) {
    throw new TypeError('range() expects only finite numbers as arguments.')
  }

  // Ensure the step is always a positive number.
  if (step <= 0) {
    throw new Error('step must be a number greater than 0.')
  }

  // When the start number is greater than the end number,
  // modify the step for decrementing instead of incrementing.
  if (start > end) {
    step = -step
  }

  // Determine the length of the array to be returned.
  // The length is incremented by 1 after Math.floor().
  // This ensures that the end number is listed if it falls within the range.
  const length = Math.floor(Math.abs((end - start) / step)) + 1

  // Fill up a new array with the range numbers
  // using Array.from() with a mapping function.
  // Finally, return the new array.
  return Array.from(Array(length), (x, index) => start + index * step)
}

export const translateRiskzone = {
  cold: '',
  dry: '',
  midmountain: '',
  mountain: '',
  premountain: '',
  warm: '',
}

export function mergeBundesland(a, b) {
  const exteriorBorder = a === b
  const idA =
    a.properties.ags.length === 5
      ? a.properties.ags.substring(0, 2)
      : a.properties.ags.substring(0, 1)
  const idB =
    b.properties.ags.length === 5
      ? b.properties.ags.substring(0, 2)
      : b.properties.ags.substring(0, 1)

  const sameBundesland = idA === idB

  return exteriorBorder || !sameBundesland
}

export async function loadTopojson(url) {
  const data = await fetch(url)
  const kreiseTopo = await data.json()

  const kreiseTopoKey = Object.keys(kreiseTopo.objects)[0]
  const kreise = feature(kreiseTopo, kreiseTopoKey)

  const kreiseMesh = mesh(kreiseTopo, kreiseTopo.objects[kreiseTopoKey])

  const states = {
    type: 'FeatureCollection',
    features: range(1, 17).map(function (i) {
      return {
        ...merge(
          kreiseTopo,
          kreiseTopo.objects[kreiseTopoKey].geometries.filter(function (d) {
            const ags = parseInt(d.properties.ags.slice(0, -3))
            return parseInt(ags) === i
          })
        ),
        properties: {
          ags: `${i}`,
          state: STATE_LABELS[i],
          center: stateCentroids[STATE_LABELS[i]],
        },
      }
    }),
  }

  const meta = Object.assign({}, kreise.features[0].properties)
  delete meta.ags
  delete meta.data

  // const statesMesh = mesh(
  //   kreiseTopo,
  //   kreiseTopo.objects[kreiseTopoKey],
  //   mergeBundesland
  // )

  const germanyPath = merge(
    kreiseTopo,
    kreiseTopo.objects[kreiseTopoKey].geometries
  )

  const germany = createFeature(germanyPath, {})

  const germanyFeature = {
    type: 'FeatureCollection',
    features: [germany],
  }

  kreise.features = kreise.features.map(function (d) {
    return {
      ...d,
      properties: {
        ...d.properties,
      },
    }
  })

  return {
    germany: germanyFeature,
    states,
    // statesMesh,
    kreise,
    kreiseMesh,
    meta,
  }
}

export const createZeitreihe = (data, datakey, sliceAt = false) => {
  const zeitreihe = data.find((d) => d.type === datakey)
  const { values } = zeitreihe
  let sortedValues = values.sort((a, b) => a[0] - b[0])

  if (sliceAt && sortedValues.length > 50) {
    sortedValues = sortedValues.slice(
      sortedValues.length - sliceAt,
      sortedValues.length - 1
    )
  }
  const zeitreiheData = sortedValues.reduce(
    (prev, curr, currIndex, array) => {
      if (currIndex === array.length - 1) {
        const yearExtent = extent(array.map((d) => d[0]))
        const minValues = array.map((d) => d[1])
        const maxValues = array.map((d) => d[3])
        const valuesExtent = extent([...minValues, ...maxValues])
        prev.meta.extentY = valuesExtent
        prev.meta.extentX = yearExtent
        prev.meta.gradient = gradient[datakey]
      }
      prev.data.push({
        year: curr[0],
        min: curr[1],
        avg: curr[2],
        max: curr[3],
      })
      return prev
    },
    { data: [], meta: { extentY: null, extentX: null, gradient: null } }
  )
  return zeitreiheData
}

export const fetchJson = async (path) => {
  const res = await fetch(path)
  const json = await res.json()
  return json
}

export const loadFile = async (filePath, delimiter = ',') => {
  const csv = dsvFormat(delimiter)

  const res = await fetch(filePath)
  const text = await res.text()

  return csv.parse(text)
}

export const loadJson = async (filePath) => {
  const res = await fetch(filePath)
  return res.json()
}
