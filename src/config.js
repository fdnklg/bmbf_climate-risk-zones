export const s3Url = 'https://locobss-story-co2.s3.eu-central-1.amazonaws.com/'

export const content = {
  project: {
    lang: 'de',
    title: 'Klimawandelrisiken in Deutschland',
    description:
      'Der Klimawandel ist längst in Deutschland angekommen. In den nächsten Jahren und Jahrzehnten, werden wir die Auswirkungen immer deutlicher spüren. Die lokalen Risiken sind stark davon abhängig wo man in Deutschland wohnt. Finde auf dieser Seite heraus, welchen Herausforderungen sich deine Region stellen muss.',
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
      step: '1.2',
      showMinimap: true,
      padding: 70,
      text: {
        title: 'Deine Region',
        paragraph: 'Um deine Region besser untersuchen zu können, haben wir ein 5km Einzugsgebiet um deine Postleitzahl gelegt.'
      },
      layers: [
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) => `Gebiet der Postleitzahl <strong>${json.postcode}</strong>.`,
            },
          ],
        },
        {
          key: 'postcode_buff_geom',
          annotations: [
            {
              text: (json) => '5 km Umkreis um deine Postleitzahl.',
            },
          ],
        },
      ],
    },
    {
      step: '1.5',
      fitBounds: [
        [5.98865807458, 47.3024876979],
        [15.0169958839, 54.983104153],
      ], // defines the focus of the bounding box
      text: {
        title: (json) => {
          let climate = 'Klima';
          switch (json.zeitreihen.meta.riskzones[0]) {
            case 'cold':
              climate = 'kühlerem Klima';
              break;
            case 'warm':
              climate = 'warmem Klima';
              break;
            case 'dry':
              climate = 'trockenerem Klima';
              break;
            case 'premountain':
              climate = 'Gebirgsvorlandklima';
              break;
            case 'midmountain':
              climate = 'Mittelgebirgsklima';
              break;
            case 'mountain':
              climate = 'Gebirgsklima';
              break;
            default:
              climate = 'Klimazone'
          }
          return `Region mit ${climate}`
        },
        paragraph: (json) => {
          switch (json.zeitreihen.meta.riskzones[0]) {
            case 'cold':
              return 'Du befindest dich in einer Region mit kühlerem Klima. Diese Region hat zwar gemäßigte Temperaturen und eine geringe Anzahl an Trocken- und Frosttagen, dafür aber eine größere Anzahl an Tagen mit Starkregen und Starkwind.';
              break;
            case 'warm':
              return 'Du befindest dich in einer Region mit warmem Klima. Diese Region zeichnet sich besonders durch Hitze und Trockenheit aus.';
              break;
            case 'dry':
              return 'Du befindest dich in einer Region mit trockenerem Klima. In diesen Regionen fällt über das ganze Jahr hinweg unterdurchschnittlich viel Regen, bei gleichzeit starken Schwankungen zwischen den Jahreszeiten bei Temperaturen und Niederschlägen.';
              break;
            case 'premountain':
              return 'Du befindest dich in einer Region mit Gebirgsvorlandklima. Neben vielen Tagen mit Frost und Starkregen, zeichnet sich diese Region auch durch überdurchschnittliche hohe Niederschläge im Sommer aus.';
              break;
            case 'midmountain':
              return 'Du befindest dich in einer Region mit Mittelgebirksklima. Neben vielen Frosttagen, zeichnet sich diese Region durch häufigen Starkregen und hohe Sommer- und Winterniederschläge aus.';
              break;
            case 'mountain':
              return 'Du befindest dich in einer Region mit Gebirgsklima. Diese Regionen zeichnen sich durch hohe Niederschlagswerte und viele Tage mit Starkregen und Frost aus.';
              break;
            default:
              return 'Klimazone'
          }
        }
      },
      layers: [
        {
          key: 'klimazonen',
          isMapbox: true,
          annotations: [
            {
              text: (json) => {
                switch(json.risk_zones[0]) {
                  case 'cold':
                    return 'Regionen mit<br />kühlerem Klima';
                    break;
                  case 'warm':
                    return 'Regionen mit<br />warmem Klima';
                    break;
                  case 'dry':
                    return 'Regionen mit<br />trockenerem Klima';
                    break;
                  case 'premountain':
                    return 'Regionen mit<br />Gebirgsvorlandklima';
                    break;
                  case 'midmountain':
                    return 'Regionen mit<br />Mittelgebirgsklima';
                    break;
                  case 'mountain':
                    return 'Regionen mit<br />Gebirgsklima';
                    break;
                  default:
                    return 'Klimazone'
                }
              },
            },
          ],
        },
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) => `Postleitzahl <strong>${json.postcode}</strong>`,
              id: 'postcode_geom',
            },
          ],
        },
      ],
    },
    {
      step: '1.5',
      fitBounds: [
        [5.98865807458, 47.3024876979],
        [15.0169958839, 54.983104153],
      ], // defines the focus of the bounding box
      text: {
        title: 'Zukünftige Herausforderungen',
        paragraph: (json) => {
          switch (json.zeitreihen.meta.riskzones[0]) {
            case 'cold':
              return 'In Zukunft kann die Wahrscheinlichkeit für Extremwetterereignisse und dir dadurch entstehenden Schäden zunehmen.';
              break;
            case 'warm':
              return 'In Zukunft wird es in diesen Regionen noch häufiger heiße Tage (mehr als 30°C) und sogenannte Tropennächte (20°C und wärmer) geben. Diese Klimaregion wird sich wahrscheinlich noch weiter ausdehnen.';
              break;
            case 'dry':
              return 'In Zukunft wird die Trockenheit in diesen Regionen weiter zunehmen und damit auf Einfluss auf die Wasserressourcen haben. Darüber hinaus ein genereller Trend zu höheren Temperaturen, über das ganze Jahr hinweg.';
              break;
            case 'premountain':
              return 'In Zukunft werden die Temperaturen im Sommer weiter steigen und damit auch die Anzahl der heißen Tage (mehr als 30°C). In manchen der Vorgebirgsregionen wird ein Ansteig der Siedlungs- und Verkehrsflächen erwartet. Dies wird die Effekte verstärken.';
              break;
            case 'midmountain':
              return 'In Zukunft werden die Temperaturen sowohl in Sommer als auch Winter weiter ansteigen, mit einer gleichzeitigen Zunahme der Niederschläge und seltenerem Schneefall.';
              break;
            case 'mountain':
              return 'In Zukunft werden sich diese Regionen überdurchschnittlich stark Erwärmen. Gleichzeit sollen Starkregenereignisse und Niederschläge im Winter zunehmen, während Niederschläge im Sommer abnehmen.';
              break;
            default:
              return 'Klimazone'
          }
        }
      },
      layers: [
        {
          key: 'klimazonen',
          isMapbox: true,
          annotations: [
            {
              text: (json) => {
                switch(json.risk_zones[0]) {
                  case 'cold':
                    return 'Regionen mit<br />kühlerem Klima';
                    break;
                  case 'warm':
                    return 'Regionen mit<br />warmem Klima';
                    break;
                  case 'dry':
                    return 'Regionen mit<br />trockenerem Klima';
                    break;
                  case 'premountain':
                    return 'Regionen mit<br />Gebirgsvorlandklima';
                    break;
                  case 'midmountain':
                    return 'Regionen mit<br />Mittelgebirgsklima';
                    break;
                  case 'mountain':
                    return 'Regionen mit<br />Gebirgsklima';
                    break;
                  default:
                    return 'Klimazone'
                }
              },
            },
          ],
        },
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) => `Postleitzahl <strong>${json.postcode}</strong>`,
              id: 'postcode_geom',
            },
          ],
        },
      ],
    },
    {
      step: '1.3',
      showMinimap: true,
      text: {
        title: 'Verdichtungsräume',
        paragraph: ''
      },
      layers: [
        {
          key: 'verdichtungsraeume',
          isMapbox: true,
          annotations: [
            {
              text: (json) => 'Verdichtungsraum.',
            },
          ],
        },
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) => 'Fläche der von dir eingegebenen Postleitzahl.',
            },
          ],
        },
      ],
    },
    {
      step: '1.1',
      showMinimap: true,
      text: {
        title: '',
        paragraph: ''
      },
      layers: [
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) => 'Fläche der von dir eingegebenen Postleitzahl.',
            },
          ],
        },
        {
          key: 'fluvial_flood',
        },
      ],
    },
    
    {
      step: '1.4',
      showMinimap: true,
      text: {
        title: '',
        paragraph: ''
      },
      layers: [
        {
          key: 'sturmfluten',
          isMapbox: true,
        },
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) => 'Fläche der von dir eingegebenen Postleitzahl.',
            },
          ],
        },
      ],
    },
    
    {
      step: '1.6',
      fitBounds: [
        [5.98865807458, 47.3024876979],
        [15.0169958839, 54.983104153],
      ], // defines the focus of the bounding box
      text: {
        title: '',
        paragraph: ''
      },
      layers: [
        {
          key: 'hochwasser',
          isMapbox: true,
        },
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) => 'Fläche der von dir eingegebenen Postleitzahl.',
              id: 'postcode_geom',
            },
          ],
        },
      ],
    },
  ],

  zeitreiheSteps: [
    {
      step: '2.1',
      data: 'merged',
      datakey: 'air_temperature_max',
      show: ['min', 'minToMax'],
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.2',
      data: 'merged',
      datakey: 'air_temperature_max',
      show: ['min', 'minToMax'],
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.3',
      data: 'merged',
      datakey: 'air_temperature_max',
      show: ['min', 'max', 'yPostcode', 'yGermany'],
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
      },
    },
    {
      step: '2.4',
      data: 'merged',
      datakey: 'air_temperature_max',
      show: ['yPostcode', 'yGermany'],
      text: {
        title: 'Überschrift hier',
        paragraph:
          'Natürlich ist es am Ende des Tages nicht so einfach, denn neben Mobilität produzieren wir in all unseren anderen Lebensbereich ebenfalls CO2 und unser gesamter Fußabdruck setzt sich aus all dem zusammen.',
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
