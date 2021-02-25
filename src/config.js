export const s3Url = 'https://locobss-story-co2.s3.eu-central-1.amazonaws.com/'

export const content = {
  project: {
    lang: 'de',
    title: 'Risikogebiete in Deutschland',
    description:
      'Unsere individuelle Mobilität hat einen spürbaren Einfluss auf den Klimawandel. Erfahre mehr darüber, wie nachhaltig deine Form der Mobilität ist.',
    socialImgUrl:
      'https://fabiandinklage.com/public/images/demos/demos-tooltip-3840x2040.jpg',
  },
  /*

  - Each step has an array of map_layers which exist in the mapbox map.
  - map_layers can contain: 'hochwasser', 'sturmfluten', 'verdichtungsraeume', 'klimazonen'.

  {
      step: '1.1', step id which is necessary to count up and trigger if szenario is in viewport
      mapbox_layers: ['hochwasser'], // names of data layers inside mapbox map
      fitBounds: [
        [5.98865807458, 47.3024876979],
        [15.0169958839, 54.983104153],
      ], defines the focus of the bounding box
      layers: [], expects object with key like layer id to show matching feature with id in geojson

    },

  */
  szenarien: [
    {
      step: '1.1',
      mapbox_layers: [],
      annotation: [
        {
          text: 'Fläche der von dir eingegebenen Postleitzahl.',
          id: 'postcode_geom',
        },
      ],
      layers: [
        {
          key: 'fluvial_flood',
        },
        {
          key: 'postcode_geom',
        },
      ],
    },
    {
      step: '1.2',
      mapbox_layers: [], // names of data layers inside mapbox map
      annotation: [
        {
          text: 'Fläche der von dir eingegebenen Postleitzahl.',
          id: 'postcode_geom',
        },
        {
          text: 'Das sind XX km Distanz.',
          id: 'postcode_buff_geom',
        },
      ],
      padding: 70,
      layers: [
        {
          key: 'postcode_geom',
        },
        {
          key: 'postcode_buff_geom',
        },
      ],
    },
    {
      step: '1.3',
      mapbox_layers: ['verdichtungsraeume'], // names of data layers inside mapbox map
      annotation: [
        {
          text: 'Fläche der von dir eingegebenen Postleitzahl.',
          id: 'postcode_geom',
        },
      ],
      padding: 100,
      layers: [
        {
          key: 'postcode_geom',
        },
      ],
    },
    {
      step: '1.4',
      mapbox_layers: ['klimazonen'],
      annotation: [
        {
          text: 'Fläche der von dir eingegebenen Postleitzahl.',
          id: 'postcode_geom',
        },
      ],
      padding: 300,
      layers: [
        {
          key: 'postcode_geom',
        },
      ],
    },
    {
      step: '1.5',
      mapbox_layers: ['hochwasser'], // names of data layers inside mapbox map
      annotation: [
        {
          text: 'Fläche der von dir eingegebenen Postleitzahl.',
          id: 'postcode_geom',
        },
      ],
      fitBounds: [
        [5.98865807458, 47.3024876979],
        [15.0169958839, 54.983104153],
      ], // defines the focus of the bounding box
      layers: [
        {
          key: 'postcode_geom',
        },
      ],
    },
  ],

  zeitreiheSteps: [
    {
      step: '2.1',
      data: 'germany',
      datakey: 'air_temperature_max',
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.2',
      data: 'postcode',
      datakey: 'frost_days',
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des <strong>Tages</strong> nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.3',
      data: 'germany',
      datakey: 'hot_days',
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des <strong>Tages</strong> nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.4',
      data: 'germany',
      datakey: 'frost_days',
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des <strong>Tages</strong> nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.5',
      data: 'germany',
      datakey: 'ice_days',
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des <strong>Tages</strong> nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.6',
      data: 'germany',
      datakey: 'snowcover_days',
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des <strong>Tages</strong> nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.7',
      data: 'germany',
      datakey: 'precipGE30mm_days',
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des <strong>Tages</strong> nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.8',
      data: 'germany',
      datakey: 'precipitation',
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des <strong>Tages</strong> nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
  ],
}

export const zipcodesUrl = `${s3Url}postcodes.txt`

export const metadata = {
  title: content.project.title,
  lang: content.project.lang,
  twitter_site: '@BMBF_Bund',
  twitter_creator: '@fdnklg',
  og_url: 'https://fabiandinklage.com',
  og_title: content.project.title,
  og_description: content.project.description,
  og_image: content.project.socialImgUrl,
}
