function createAnnotation(layersWithAnchors, layer, szenario) {
  const { annotations, key } = layer
  const current = layersWithAnchors.find((d) => d.id === key).anchors
  annotations.forEach((annotation) => {
    if (key === 'klimazonen') {
      current.forEach((currenAnnotation) => {
        const { anchors, fid } = currenAnnotation
        szenario.anchors.push({
          fid,
          anchors: anchors.map((d) => d.coordinates),
          text: 'Klimazonen',
        })
      })
    } else if (current) {
      const coords = current.map((p) => p.coordinates)
      szenario.anchors.push({
        anchors: coords,
        text: annotation.text,
        isVertical: ['postcode_buff_geom', 'klimazonen'].includes(key),
      })
    }
  })
}

export function addAnnotations(json, szenario, layer) {
  const { postcode_anchors, postcode_buff_anchors, risk_zone_anchors } = json
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
  ]

  const anchorIds = layersWithAnchors.map((d) => d.id)

  // create annotation object for local layers
  if (anchorIds.includes(key) && annotations && annotations.length > 0) {
    createAnnotation(layersWithAnchors, layer, szenario)
  }
}
