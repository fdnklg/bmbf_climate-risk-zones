import { dsvFormat } from 'd3-dsv'
import { extent } from 'd3-array'
import { zeitreiheDataGradients as gradient } from 'constants'

export const translateRiskzone = {
  cold: '',
  dry: '',
  midmountain: '',
  mountain: '',
  premountain: '',
  warm: '',
}

function getGradient(key) {}

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
