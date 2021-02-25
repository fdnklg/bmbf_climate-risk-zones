import { writable, derived } from 'svelte/store'
import bbox from '@turf/bbox'
import { fetchJson, createZeitreihe, getStyle } from 'utils'
import {
  createGeojson,
  createFeature,
  createBoundingBox,
} from 'components/Map3D/utils.js'
import { zeitreiheDataKeys, s3UrlRisk, styles } from 'constants'

export const data = writable(null)
export const activeZipcode = writable(50667)
export const zipcodes = writable([])
export const userInput = writable(false)
export const activeKeyZeitreihe = writable('air_temperature_max')
export const selectedAnchors = writable([])

let cache = {}

export const storyData = derived(
  [data, activeZipcode],
  ([$data, $activeZipcode], set) => {
    const zipcode =
      $activeZipcode.length === 4 ? `0${$activeZipcode}` : $activeZipcode
    const getData = async () => {
      const json = await fetchJson(`${s3UrlRisk}postcode/${zipcode}.json`)
      if ($data) {
        let dataObj = {}
        const { szenarien } = $data
        const {
          data_germany,
          data_postcode,
          risk_zones,
          dense_space,
          postcode,
          has_ocean_flood,
          postcode_anchors,
          postcode_buff_anchors,
        } = json

        szenarien.map((szenario) => {
          const { layers, mapbox_layers, annotation } = szenario

          const szenarioGeojson = createGeojson()
          szenarioGeojson.mapbox_layers = mapbox_layers
          szenario.anchors = []

          // add fit bounds of dense space to step, if verdichtungsräume is in mapbox_layers
          if (mapbox_layers.includes('verdichtungsraeume') && dense_space) {
            console.log(dense_space.bbox)

            szenario.fitBounds = dense_space.bbox
              ? dense_space.bbox.coordinates[0]
              : false
          }

          // create feature for each layer based on config
          layers.map((layer) => {
            const { key } = layer
            const style = styles[key]
            const geometries = json[key]

            // if geometries is an array create feature for each item and push it to array
            if (geometries && geometries.length > 1) {
              geometries.forEach((geometry) => {
                const propsFill = {
                  id: `${key}-fill`,
                  ...style,
                  level: geometry.level,
                }

                const propsContour = {
                  id: `${key}-contour`,
                  ...style,
                  level: geometry.level,
                }

                const featureFill = createFeature(geometry.geom, propsFill)
                const featureContour = createFeature(
                  geometry.geom,
                  propsContour
                )
                szenarioGeojson.features.push(featureFill)
                szenarioGeojson.features.push(featureContour)
              })
              // else if geometry has only on object push to features
            } else {
              // if the key layer is the mask
              const propsFill = {
                id: `${key}-fill`,
                ...style,
                // level: geometry.level,
              }

              const propsContour = {
                id: `${key}-contour`,
                ...style,
                // level: geometry.level,
              }

              if (key === 'postcode_buff_geom') {
                const propsMask = {
                  id: `${key}-mask`,
                  ...style,
                  // level: geometry.level,
                }

                const featureMask = createFeature(geometries, propsMask)
                szenarioGeojson.features.push(createBoundingBox(featureMask))
                szenario.fitBounds = bbox(featureMask)
              }

              const featureFill = createFeature(geometries, propsFill)
              const featureContour = createFeature(geometries, propsContour)

              // add white mask of postcode buffer shape feature here
              szenarioGeojson.features.push(featureFill)
              szenarioGeojson.features.push(featureContour)
            }

            // create annotations with anchors from json and config
            const layersWithAnchors = [
              {
                id: 'postcode_geom',
                anchors: postcode_anchors,
              },
              {
                id: 'postcode_buff_geom',
                anchors: postcode_buff_anchors,
              },
            ]

            if (layersWithAnchors.map((d) => d.id).includes(key)) {
              const current = layersWithAnchors.find((d) => d.id === key)
                .anchors
              const coords = current.map((p) => p.coordinates)
              const annotation = szenario.annotation.find((d) => d.id === key)
              annotation.anchors = coords
              annotation.isVertical = current.id === 'postcode_buff_geom'
              szenario.anchors.push(annotation)
            }
          })

          szenario.geojson = szenarioGeojson
          szenario.postcode = postcode
          szenario.denseSpace = dense_space.bbox ? dense_space : false
        })

        let zeitreihen = {
          postcode: {},
          germany: {},
          meta: {
            riskzones: risk_zones,
            denseSpace: dense_space.bbox === 1 ? true : false,
            hasOceanFlood: has_ocean_flood === 1 ? true : false,
          },
        }
        zeitreiheDataKeys.map((datakey) => {
          const zeitreiheGermany = createZeitreihe(data_germany, datakey, 50)
          const zeitreihePostcode = createZeitreihe(data_postcode, datakey, 50)
          zeitreihen.germany[datakey] = zeitreiheGermany
          zeitreihen.postcode[datakey] = zeitreihePostcode
        })
        dataObj.szenarien = szenarien
        dataObj.zeitreihen = zeitreihen

        set(dataObj)
      }
    }
    getData()
  }
)

export const zeitreihenData = derived(
  [storyData, data, activeKeyZeitreihe],
  ([$storyData, $data, $activeKeyZeitreihe], set) => {
    if ($storyData && $data) {
      const { zeitreihen } = $storyData
      const { zeitreiheSteps } = $data
      const zeitreiheData = zeitreiheSteps.map((step) => ({
        ...step,
        ...zeitreihen[step.data][step.datakey],
      }))
      set(zeitreiheData)
    }
  }
)
