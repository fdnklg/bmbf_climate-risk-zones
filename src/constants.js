export const mapbox_layers = [
  'hochwasser',
  'sturmfluten',
  'verdichtungsraeume',
  'klimazonen',
]

export const zeitreiheDataKeys = [
  'air_temperature_max',
  'air_temperature_mean',
  'drought_index',
  'frost_days',
  'hot_days',
  'ice_days',
  'precipGE30mm_days',
  'precipitation',
  'snowcover_days',
  'summer_days',
]

export const s3Url = 'https://locobss-story-co2.s3.eu-central-1.amazonaws.com/'
export const s3UrlRisk =
  'https://locobss-story-risk.s3.eu-central-1.amazonaws.com/'
export const zipCodesUrl = `${s3Url}postcodes.txt`

export const styles = {
  fluvial_flood: {
    fill: 'blue',
    stroke: 'blue',
    'line-width': 0.75,
    'fill-opacity': 0.05,
    'line-opacity': 0.1,
  },
  postcode_geom: {
    fill: 'white',
    stroke: 'black',
    'line-width': 2,
    'fill-opacity': 0.4,
    'line-opacity': 1,
  },
  postcode_buff_geom: {
    fill: 'red',
    stroke: 'black',
    'line-width': 1,
    'fill-opacity': 0,
    'line-opacity': 1,
  },
}

export const zeitreiheDataGradients = {
  air_temperature_max: ['#C7A168', '#B46250'],
  air_temperature_mean: ['#C7A168', '#B46250'],
  drought_index: ['#C7A168', '#B46250'],
  hot_days: ['#C7A168', '#B46250'],
  summer_days: ['#C7A168', '#B46250'],
  frost_days: ['#C5DCDB', '#6FA9AD'],
  ice_days: ['#C5DCDB', '#6FA9AD'],
  snowcover_days: ['#C5DCDB', '#6FA9AD'],
  precipGE30mm_days: ['#7ACB9A', '#9681B0'],
  precipitation: ['#7ACB9A', '#9681B0'],
}

export const zeitreiheHeadlines = {
  air_temperature_max: {
    min: 'Mindest-',
    max: 'Maximal-',
    avg: 'Durchschnittstemperaturen',
    metricHeadline: 'in °C',
    metric: '°C',
  },
  air_temperature_mean: {
    min: 'Mindest-',
    max: 'Maximal-',
    avg: 'Durchschnittlichstemperaturen',
    metricHeadline: 'in °C',
    metric: '°C',
  },
  drought_index: {
    min: 'Mindest-',
    max: 'Maximal-',
    avg: 'Durchschnitts-Index',
    metricHeadline: 'als Indikator',
    metric: '°C',
  },
  frost_days: {
    min: 'Minimale',
    max: 'maximale',
    avg: 'durchschnittliche',
    metricHeadline: 'Anzahl Frosttage',
    metric: 'Tage',
  },
  hot_days: {
    min: 'Minimale',
    max: 'maximale',
    avg: 'durchschnittliche',
    metricHeadline: 'Anzahl heißer Tage',
    metric: 'Tage',
  },
  ice_days: {
    min: 'Minimale',
    max: 'maximale',
    avg: 'durchschnittliche',
    metricHeadline: 'Anzahl Tage unter 0°C',
    metric: '°C',
  },
  precipGE30mm_days: {
    min: 'Minimale',
    max: 'maximale',
    avg: 'durchschnittliche',
    metricHeadline: 'Anzahl Tage mit viel Niederschlag (>30&thinsp;mm)',
    metric: 'Tage',
  },
  precipitation: {
    min: 'Mindest-',
    max: 'Maximal-',
    avg: 'Durchschnitts-Niederschläge',
    metricHeadline: 'in mm',
    metric: 'mm',
  },
  snowcover_days: {
    min: 'Minimale',
    max: 'maximale',
    avg: 'durchschnittliche',
    metricHeadline: 'Anzahl schneebedeckter Tage',
    metric: 'Tage',
  },
  summer_days: {
    min: 'Minimale',
    max: 'maximale',
    avg: 'durchschnittliche',
    metricHeadline: 'Anzahl sommerlicher Tage (>30°&thinsp;C)',
    metric: 'Tage',
  },
}
