import { dsvFormat } from 'd3-dsv'
import { extent } from 'd3-array'
import { zeitreiheDataGradients as gradient, styles } from 'constants'
import { feature, mesh, merge } from 'topojson-client'
import { createFeature, cerateGeo } from 'components/Map3D/utils.js'

export const translateRiskzone = {
  cold: '',
  dry: '',
  midmountain: '',
  mountain: '',
  premountain: '',
  warm: '',
}

const range = function (start, stop, step = 1) {
  let numbers = []
  for (let index = start; index < stop; index += step) {
    numbers.push(index)
  }
  return numbers
}

export default range

export async function loadTopojson(url) {
  const data = await fetch(url)
  const kreiseTopo = await data.json()

  // @TODO Do the merging later!

  const kreiseTopoKey = Object.keys(kreiseTopo.objects)[0]
  const kreise = feature(kreiseTopo, kreiseTopoKey)

  const kreiseMesh = mesh(kreiseTopo, kreiseTopo.objects[kreiseTopoKey])

  // const states = {
  //   type: 'FeatureCollection',
  //   features: range(1, 17).map(function (i) {
  //     return {
  //       ...merge(
  //         kreiseTopo,
  //         kreiseTopo.objects[kreiseTopoKey].geometries.filter(function (d) {
  //           const ags = parseInt(d.properties.ags.slice(0, -3))
  //           return parseInt(ags) === i
  //         })
  //       ),
  //       properties: {
  //         ags: `${i}`,
  //         state: STATE_LABELS[i],
  //         center: stateCentroids[STATE_LABELS[i]],
  //       },
  //     }
  //   }),
  // }

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

  // kreise.features = kreise.features.map(function (d) {
  //   return {
  //     ...d,
  //     properties: {
  //       ...d.properties,
  //       ...agsMeta[d.properties.ags],
  //     },
  //   }
  // })

  return {
    germany: germanyFeature,
    // states,
    // statesMesh,
    kreise,
    kreiseMesh,
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

export function addPropAndMap(propValue, propKey, array) {
  return array.map((p) => {
    p.properties = { [propKey]: propValue }
    return p
  })
}

export const loadJson = async (filePath) => {
  const res = await fetch(filePath)
  return res.json()
}
