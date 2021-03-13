import { klimazonenDict, fluvial_flood_anchor_indices } from 'constants'

function createAnnotation(layersWithAnchors, json, layer, szenario) {
  const { annotations, key } = layer
  const current = layersWithAnchors.find((d) => d.id === key).anchors
  annotations.forEach((annotation) => {
    if (key === 'klimazonen') {
      current.forEach((currenAnnotation) => {
        const { anchors, fid } = currenAnnotation
        const currentKlimazone = klimazonenDict.find((d) => d.fid === fid)
        szenario.anchors.push({
          fid,
          anchors: anchors.map((d) => d.coordinates),
          text: annotation.text(currentKlimazone.type),
          isVertical: true,
        })
      })
    } else if (key === 'fluvial_flood') {
      current.forEach((currenAnnotation) => {
        const { anchors, level } = currenAnnotation
        console.log(
          'currenAnnotation',
          currenAnnotation,
          currenAnnotation.level
        )
        szenario.anchors.push({
          level,
          anchors: anchors
            .map((d) => d.coordinates)
            .filter((d, i) =>
              fluvial_flood_anchor_indices[currenAnnotation.level].includes(i)
            ),
          text: annotation.text(level),
        })
      })
    } else if (current) {
      const coords = current.map((p) => p.coordinates)
      szenario.anchors.push({
        anchors: coords,
        text: annotation.text(json),
        isVertical: ['postcode_buff_geom', 'klimazonen'].includes(key),
      })
    }
  })
}

export function addAnnotations(json, szenario, layer) {
  const {
    postcode_anchors,
    postcode_buff_anchors,
    risk_zone_anchors,
    fluvial_flood_anchors,
    dense_space,
  } = json

  const { anchors } = dense_space

  const { key, annotations } = layer

  const layersWithAnchors = [
    {
      id: 'postcode_geom',
      anchors: postcode_anchors,
    },
    {
      id: 'postcode_buff_geom',
      anchors: postcode_buff_anchors,
    },
    {
      id: 'klimazonen',
      anchors: risk_zone_anchors,
    },
    {
      id: 'fluvial_flood',
      anchors: fluvial_flood_anchors,
    },
    {
      id: 'verdichtungsraeume',
      anchors: anchors,
    },
  ]

  const anchorIds = layersWithAnchors.map((d) => d.id)

  // create annotation object for local layers
  if (anchorIds.includes(key) && annotations && annotations.length > 0) {
    createAnnotation(layersWithAnchors, json, layer, szenario)
  }
}
