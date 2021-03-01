import { dsvFormat } from 'd3-dsv'
import { extent } from 'd3-array'
import { zeitreiheDataGradients as gradient, styles } from 'constants'
import { feature, mesh, merge } from 'topojson-client'
import { createFeature } from 'components/Map3D/utils.js'
import { STATE_LABELS, stateCentroids } from 'constants'

export function range(start, end, step = 1) {
  const allNumbers = [start, end, step].every(Number.isFinite)

  if (!allNumbers) {
    throw new TypeError('range() expects only finite numbers as arguments.')
  }

  if (step <= 0) {
    throw new Error('step must be a number greater than 0.')
  }

  if (start > end) {
    step = -step
  }

  const length = Math.floor(Math.abs((end - start) / step)) + 1

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

function createAvg(data) {
  const total = data[0].length - 1
  let averages = []
  range(0, total).map((index) => {
    let values = []
    data.forEach((kreis) => {
      const value = kreis[index]
      values.push(value)
    })
    const sum = values.reduce((a, b) => a + b, 0)
    const avg = sum / total
    averages.push(avg)
  })
  return averages
}

function addRollingAvg(data, days = 7) {
  const countData = new Array(days).fill(0)
  for (let index = 0; index < data.length; index++) {
    countData.push(Math.max(data[index], 0))
    countData.shift()
    data[index] = getMean(countData)
  }
}

function sum(sum, element) {
  return sum + element
}

function getMean(array) {
  return array.reduce(sum) / array.length
}

export function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

export async function loadTopojson(url) {
  const data = await fetch(url)
  const kreiseTopo = await data.json()

  const kreiseTopoKey = Object.keys(kreiseTopo.objects)[0]
  let kreise = feature(kreiseTopo, kreiseTopoKey)

  kreise.features.forEach((feature) => {
    const data = feature.properties.data
    feature.properties.data = data.map((d) => d / 10)
  })

  let avgGermany = createAvg(kreise.features.map((d) => d.properties.data))
  addRollingAvg(avgGermany)
  avgGermany.splice(0, 6)

  kreise.features.forEach((feature) => {
    feature.properties.data.splice(0, 6)
  })

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
  meta.value_max = meta.value_max / 10
  meta.value_min = meta.value_min / 10
  meta.avgGermany = avgGermany
  meta.extentGermany = extent(avgGermany)
  meta.year_min = meta.year_min + 6
  delete meta.ags
  delete meta.data

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
