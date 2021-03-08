import { writable, derived } from 'svelte/store'
import bbox from '@turf/bbox'
import { fetchJson, createZeitreihe, mergeZeitreihen } from 'utils'
import { addAnnotations } from 'annotation'
import {
  createGeojson,
  createFeature,
  createBoundingBox,
} from 'components/Map3D/utils.js'
import { zeitreiheDataKeys, s3UrlRisk, styles } from 'constants'

export const data = writable(null)
export const activeZipcode = writable(10115)
export const zipcodes = writable([])
export const userInput = writable(false)
export const activeKeyZeitreihe = writable('air_temperature_max')
export const selectedAnchors = writable([])
export const jsonData = writable(null)

export const storyData = derived(
  [data, activeZipcode],
  ([$data, $activeZipcode], set) => {
    if ($activeZipcode) {
      const zipcode =
        $activeZipcode.length === 4 ? `0${$activeZipcode}` : $activeZipcode
      const getData = async () => {
        const json = await fetchJson(`${s3UrlRisk}postcode/${zipcode}.json`)
        if ($data) {
          console.log($data)
          let dataObj = {}
          let { szenarien } = $data
          const {
            data_germany,
            data_postcode,
            risk_zones,
            risk_zone_ids,
            dense_space,
            postcode,
            has_ocean_flood,
            fluvial_flood,
            postcode_anchors,
            postcode_buff_anchors,
            postcode_point,
          } = json

          const isDenseSpace = dense_space.bbox
          const hasOceanFlood = has_ocean_flood === 1
          const hasFluvialFlood = fluvial_flood.length > 0

          // remove steps from config if json is no dense space
          if (!isDenseSpace) {
            szenarien = szenarien.filter(
              (d) => !d.layers.map((l) => l.key).includes('verdichtungsraeume')
            )
          }

          // remove steps from config if json has no fluvial floods
          if (!hasFluvialFlood) {
            szenarien = szenarien.filter(
              (d) => !d.layers.map((l) => l.key).includes('fluvial_flood')
            )
          }
          // remove steps from config if json has no ocean floods
          if (!hasOceanFlood) {
            szenarien = szenarien.filter(
              (d) => !d.layers.map((l) => l.key).includes('sturmfluten')
            )
          }

          szenarien.map((szenario) => {
            const { layers } = szenario

            const szenarioGeojson = createGeojson()
            szenario.anchors = []

            const layerKeys = layers.map((d) => d.key)

            // add fit bounds of dense space to step, if verdichtungsräume is in mapbox_layers
            if (layerKeys.includes('verdichtungsraeume') && isDenseSpace) {
              szenario.fitBounds = isDenseSpace
                ? dense_space.bbox.coordinates[0]
                : false
            }

            if (layerKeys.includes('sturmfluten') && has_ocean_flood === 1) {
              szenario.fitBounds = [
                [5.4114989666, 53.9672128132],
                [11.5187153871, 53.9672128132],
                [11.5187153871, 56.6991562065],
                [5.4114989666, 56.6991562065],
                [5.4114989666, 53.9672128132],
              ]
            }

            // create feature for each layer based on config
            layers.map((layer) => {
              const { key, isMapbox } = layer
              const style = styles[key]
              const geometries = json[key]

              // if geometries is an array create feature for each item and push it to array
              if (geometries && geometries.length > 1 && !isMapbox) {
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
              } else if (!isMapbox) {
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

                if (key === 'postcode_geom') {
                  szenario.postcodeShape = featureFill
                }
                // add white mask of postcode buffer shape feature here
                szenarioGeojson.features.push(featureFill)
                szenarioGeojson.features.push(featureContour)
              }

              addAnnotations(json, szenario, layer)
            })

            szenario.geojson = szenarioGeojson
            szenario.postcode = postcode
            szenario.marker = postcode_point
            szenario.denseSpace = dense_space.bbox ? dense_space : false
            szenario.risk_zone_ids = risk_zone_ids
          })

          let zeitreihen = {
            postcode: {},
            germany: {},
            merged: {},
            meta: {
              riskzones: risk_zones,
              denseSpace: dense_space.bbox === 1 ? true : false,
              hasOceanFlood: has_ocean_flood === 1 ? true : false,
            },
          }

          zeitreiheDataKeys.map((datakey) => {
            const zeitreiheGermany = createZeitreihe(data_germany, datakey, 50)
            const zeitreihePostcode = createZeitreihe(
              data_postcode,
              datakey,
              50
            )
            // set same extent for postcode
            zeitreihePostcode.meta.extentY = zeitreiheGermany.meta.extentY

            const mergedZeitreihen = mergeZeitreihen(
              zeitreihePostcode,
              zeitreiheGermany
            )

            zeitreihen.germany[datakey] = zeitreiheGermany
            zeitreihen.postcode[datakey] = zeitreihePostcode
            zeitreihen.merged[datakey] = mergedZeitreihen
          })

          dataObj.zeitreihen = zeitreihen
          dataObj.szenarien = szenarien

          set(dataObj)
        }
      }
      getData()
    }
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
