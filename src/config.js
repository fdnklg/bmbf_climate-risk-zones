import {
  fluvial_flood_low,
  fluvial_flood_medium,
  fluvial_flood_high,
  dense_space,
} from 'constants'

import { getPostcode } from 'utils'

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
  szenarien: [
    {
      step: '1.1',
      showMinimap: true,
      text: {
        title: 'Deine Region',
        paragraph:
          'Um deine Region besser untersuchen zu können, haben wir ein 5km Einzugsgebiet um deine Postleitzahl gelegt.',
      },
      layers: [
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) => {
                return `Gebiet der Postleitzahl <strong>${getPostcode(
                  json.postcode
                )}</strong>`
              },
            },
          ],
        },
        {
          key: 'postcode_buff_geom',
          annotations: [
            {
              text: (json) => '5 km Umkreis um deine Postleitzahl',
            },
          ],
        },
      ],
    },
    {
      step: '1.2',
      fitBounds: [
        [5.98865807458, 47.3024876979],
        [15.0169958839, 54.983104153],
      ], // defines the focus of the bounding box
      text: {
        title: (json) => {
          let climate = 'Klima'
          switch (json.zeitreihen.meta.riskzones[0]) {
            case 'cold':
              climate = 'kühlerem Klima'
              break
            case 'warm':
              climate = 'warmem Klima'
              break
            case 'dry':
              climate = 'trockenerem Klima'
              break
            case 'premountain':
              climate = 'Gebirgsvorlandklima'
              break
            case 'midmountain':
              climate = 'Mittelgebirgsklima'
              break
            case 'mountain':
              climate = 'Gebirgsklima'
              break
            default:
              climate = 'Klimazone'
          }
          return `Region mit ${climate}`
        },
        paragraph: (json) => {
          switch (json.zeitreihen.meta.riskzones[0]) {
            case 'cold':
              return 'Du befindest dich in einer Region mit <span class="cold bold">kühlerem Klima</span>. Diese Region hat zwar gemäßigte Temperaturen und eine geringe Anzahl an Trocken- und Frosttagen, dafür aber eine größere Anzahl an Tagen mit Starkregen und Starkwind.'
              break
            case 'warm':
              return 'Du befindest dich in einer Region mit  <span class="warm bold">warmem Klima.</span> Diese Region zeichnet sich besonders durch Hitze und Trockenheit aus.'
              break
            case 'dry':
              return 'Du befindest dich in einer Region mit  <span class="dry bold">trockenerem Klima.</span> In diesen Regionen fällt über das ganze Jahr hinweg unterdurchschnittlich viel Regen, bei gleichzeit starken Schwankungen zwischen den Jahreszeiten bei Temperaturen und Niederschlägen.'
              break
            case 'premountain':
              return 'Du befindest dich in einer Region mit  <span class="premountain bold">Gebirgsvorlandklima.</span> Neben vielen Tagen mit Frost und Starkregen, zeichnet sich diese Region auch durch überdurchschnittliche hohe Niederschläge im Sommer aus.'
              break
            case 'midmountain':
              return 'Du befindest dich in einer Region mit  <span class="midmountain bold">Mittelgebirksklima.</span> Neben vielen Frosttagen, zeichnet sich diese Region durch häufigen Starkregen und hohe Sommer- und Winterniederschläge aus.'
              break
            case 'mountain':
              return 'Du befindest dich in einer Region mit  <span class="mountain bold">Gebirgsklima.</span> Diese Regionen zeichnen sich durch hohe Niederschlagswerte und viele Tage mit Starkregen und Frost aus.'
              break
            default:
              return 'Klimazone'
          }
        },
      },
      layers: [
        {
          key: 'klimazonen',
          isMapbox: true,
          annotations: [
            {
              text: (klimazone) => {
                switch (klimazone) {
                  case 'cold':
                    return 'Regionen mit<br /><span class="cold bold">kühlerem Klima</span>'
                    break
                  case 'warm':
                    return 'Regionen mit<br /><span class="warm bold">warmem Klima</span>'
                    break
                  case 'dry':
                    return 'Regionen mit<br /><span class="dry bold">trockenerem Klima</span>'
                    break
                  case 'premountain':
                    return 'Regionen mit<br /><span class="premountain bold">Gebirgsvorlandklima</span>'
                    break
                  case 'midmountain':
                    return 'Regionen mit<br /><span class="midmountain bold">Mittelgebirgsklima</span>'
                    break
                  case 'mountain':
                    return 'Regionen mit<br /><span class="mountain bold">Gebirgsklima</span>'
                    break
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
              text: (json) =>
                `Deine Postleitzahl <strong>${getPostcode(
                  json.postcode
                )}</strong>`,
              id: 'postcode_geom',
            },
          ],
        },
      ],
    },
    {
      step: '1.3',
      fitBounds: [
        [5.98865807458, 47.3024876979],
        [15.0169958839, 54.983104153],
      ], // defines the focus of the bounding box
      text: {
        title: 'Zukünftige Herausforderungen',
        paragraph: (json) => {
          switch (json.zeitreihen.meta.riskzones[0]) {
            case 'cold':
              return 'In Zukunft kann die Wahrscheinlichkeit für Extremwetterereignisse und dir dadurch entstehenden Schäden zunehmen.'
              break
            case 'warm':
              return 'In Zukunft wird es in diesen Regionen noch häufiger heiße Tage <span class="addition">(mehr als 30&thinsp;°C)</span> und sogenannte Tropennächte <span class="addition">(20&thinsp;°C und wärmer)</span> geben. Diese Klimaregion wird sich wahrscheinlich noch weiter ausdehnen.'
              break
            case 'dry':
              return 'In Zukunft wird die Trockenheit in diesen Regionen weiter zunehmen und damit auf Einfluss auf die Wasserressourcen haben. Darüber hinaus ein genereller Trend zu höheren Temperaturen, über das ganze Jahr hinweg.'
              break
            case 'premountain':
              return 'In Zukunft werden die Temperaturen im Sommer weiter steigen und damit auch die Anzahl der heißen Tage <span class="addition">(mehr als 30&thinsp;°C)</span>. In manchen der Vorgebirgsregionen wird ein Ansteig der Siedlungs- und Verkehrsflächen erwartet. Dies wird die Effekte verstärken.'
              break
            case 'midmountain':
              return 'In Zukunft werden die Temperaturen sowohl in Sommer als auch Winter weiter ansteigen, mit einer gleichzeitigen Zunahme der Niederschläge und seltenerem Schneefall.'
              break
            case 'mountain':
              return 'In Zukunft werden sich diese Regionen überdurchschnittlich stark Erwärmen. Gleichzeit sollen Starkregenereignisse und Niederschläge im Winter zunehmen, während Niederschläge im Sommer abnehmen.'
              break
            default:
              return 'Klimazone'
          }
        },
      },
      layers: [
        {
          key: 'klimazonen',
          isMapbox: true,
          annotations: [
            {
              text: (klimazone) => {
                switch (klimazone) {
                  case 'cold':
                    return 'Regionen mit<br /><span class="cold bold">kühlerem Klima</span>'
                    break
                  case 'warm':
                    return 'Regionen mit<br /><span class="warm bold">warmem Klima</span>'
                    break
                  case 'dry':
                    return 'Regionen mit<br /><span class="dry bold">trockenerem Klima</span>'
                    break
                  case 'premountain':
                    return 'Regionen mit<br /><span class="premountain bold">Gebirgsvorlandklima</span>'
                    break
                  case 'midmountain':
                    return 'Regionen mit<br /><span class="midmountain bold">Mittelgebirgsklima</span>'
                    break
                  case 'mountain':
                    return 'Regionen mit<br /><span class="mountain bold">Gebirgsklima</span>'
                    break
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
              text: (json) =>
                `Deine Postleitzahl <strong>${getPostcode(
                  json.postcode
                )}</strong>`,
              id: 'postcode_geom',
            },
          ],
        },
      ],
    },
    {
      step: '1.4',
      fitBounds: [
        [5.98865807458, 47.3024876979],
        [15.0169958839, 54.983104153],
      ], // defines the focus of the bounding box
      text: {
        title: 'Handlungsfelder',
        paragraph: (json) => {
          let r = 'In dieser Region müssen vor allem die Themen '
          switch (json.zeitreihen.meta.riskzones[0]) {
            case 'cold':
              r +=
                'Wasserwirtschaft und -haushalt, Küsten- und Meeresschutz, Verkehr sowie Bauwesen, Industrie und Gewerbe'
              break
            case 'warm':
              r +=
                'menschliche Gesundheit, Forst- und Landwirtschaft sowie Verkehr'
              break
            case 'dry':
              r +=
                'Wasserwirtschaft und -haushalt sowie Land- und Forstwirtschaft'
              break
            case 'premountain':
              r += 'menschliche Gesundheit und Energiewirtschaft'
              break
            case 'midmountain':
              r += 'Wasserwirtschaft und -haushalt sowie der Tourismus'
              break
            case 'mountain':
              r +=
                'Biologische Vielfalt, Wasserwirtschaft und -haushalt, Bauwesen, Verkehr sowie Industrie und Gewerbe'
              break
            default:
              r += '...'
          }
          return (
            r +
            ' mit Nachdruck behandelt werden. Am Ende des Artikels haben wir weiterführende Links zu den wichtigen Themen für deine Region zusammengestellt.'
          )
        },
      },
      layers: [
        {
          key: 'klimazonen',
          isMapbox: true,
          annotations: [
            {
              text: (klimazone) => {
                switch (klimazone) {
                  case 'cold':
                    return 'Regionen mit<br /><span class="cold bold">kühlerem Klima</span>'
                    break
                  case 'warm':
                    return 'Regionen mit<br /><span class="warm bold">warmem Klima</span>'
                    break
                  case 'dry':
                    return 'Regionen mit<br /><span class="dry bold">trockenere Klima</span>'
                    break
                  case 'premountain':
                    return 'Regionen mit<br /><span class="premountain bold">Gebirgsvorlandklima</span>'
                    break
                  case 'midmountain':
                    return 'Regionen mit<br /><span class="midmountain bold">Mittelgebirgsklima</span>'
                    break
                  case 'mountain':
                    return 'Regionen mit<br /><span class="mountain bold">Gebirgsklima</span>'
                    break
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
              text: (json) =>
                `Deine Postleitzahl <strong>${getPostcode(
                  json.postcode
                )}</strong>`,
              id: 'postcode_geom',
            },
          ],
        },
      ],
    },
    {
      step: '1.5',
      showMinimap: true,
      padding: 75,
      text: {
        title: 'Verdichtungsräume',
        paragraph: (json) =>
          `Deine Region befindet sich im <span class="bold" style="color: ${dense_space};">Verdichtungsraum</span> <strong>${json.zeitreihen.meta.denseSpaceName}</strong>. Verdichtungsräume sind Gebiete mit einer hohen Dichte an Siedlungs- und Industrieflächen. In diesen Gebieten konzentrieren sich Gefahren für Schäden an Gebäuden und Infrastruktur, durch z.B. Hitzebelastung oder extreme Wetterereignisse. Durch die hohe Bevölkerungsdichte in diesen Gebieten sind viele Menschen durch die Folgen betroffen.`,
      },
      layers: [
        {
          key: 'verdichtungsraeume',
          isMapbox: true,
          annotations: [
            {
              text: (json) =>
                `<span class="dense-space bold">Verdichtungsraum</span> ${json.dense_space.name}`,
            },
          ],
        },
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) =>
                `Deine Postleitzahl <strong>${getPostcode(
                  json.postcode
                )}</strong>`,
            },
          ],
        },
      ],
    },
    {
      step: '1.7',
      showMinimap: true,
      text: {
        title: 'Überschwemmungen',
        paragraph: `Auch Hochwasser können durch den Klimawandel begünstigt werden. Die Bundesanstalt für Gewässer&shy;kunde veröffentlicht regelmäßig Informationen zu Hochwassergefahren. Diese werden dabei in drei Klassen eingeteilt. Regionen mit einer <strong style="color:${fluvial_flood_high};">hohen Wahr&shy;scheinlichkeit</strong> für Hochwasser (einmal in 10-30 Jahren).`,
      },
      layers: [
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) =>
                `Deine Postleitzahl <strong>${getPostcode(
                  json.postcode
                )}</strong>`,
            },
          ],
        },
        {
          key: 'fluvial_flood',
          type: ['H'],
          annotations: [
            {
              text: (level) => {
                switch (level) {
                  case 'L':
                    return `<span class="bold" style="color: ${fluvial_flood_low}">Sehr geringe Wahrscheinlichkeit</span>`
                    break
                  case 'M':
                    return `<span class="bold" style="color: ${fluvial_flood_medium}">Geringe Wahrscheinlichkeit</span>`
                    break
                  case 'H':
                    return `<span class="bold" style="color: ${fluvial_flood_high}">Hohe Wahrscheinlichkeit</span>`
                    break
                }
              },
            },
          ],
        },
      ],
    },
    {
      step: '1.8',
      showMinimap: true,
      text: {
        title: 'Überschwemmungen',
        paragraph: (json) => 
          `${((json.szenarien.filter((s) => s.step === '1.7').length >= 1) ? '' : 'Auch Hochwasser können durch den Klimawandel begünstigt werden. Die Bundesanstalt für Gewässer&shy;kunde veröffentlicht regelmäßig Informationen zu Hochwassergefahren. Diese werden dabei in verschiedene Klassen nach Wahrscheinlichkeit eingeteilt. Für deine PLZ gibt es ')}Regionen mit einer <strong style="color:${fluvial_flood_medium};">geringen Wahrscheinlichkeit</strong> für Hochwasser (einmal in 100 Jahren).`,
      },
      layers: [
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) =>
                `Deine Postleitzahl <strong>${getPostcode(
                  json.postcode
                )}</strong>`,
            },
          ],
        },
        {
          key: 'fluvial_flood',
          type: ['M'],
          annotations: [
            {
              text: (level) => {
                switch (level) {
                  case 'L':
                    return `<span class="bold" style="color: ${fluvial_flood_low}">Sehr geringe Wahrscheinlichkeit</span>`
                    break
                  case 'M':
                    return `<span class="bold" style="color: ${fluvial_flood_medium}">Geringe Wahrscheinlichkeit</span>`
                    break
                  case 'H':
                    return `<span class="bold" style="color: ${fluvial_flood_high}">Hohe Wahrscheinlichkeit</span>`
                    break
                }
              },
            },
          ],
        },
      ],
    },
    {
      step: '1.9',
      showMinimap: true,
      text: {
        title: 'Überschwemmungen',
        paragraph: (json) =>
          `${((json.szenarien.filter((s) => s.step === '1.7' || s.step === '1.8').length >= 1) ? 'Und ' : 'Auch Hochwasser können durch den Klimawandel begünstigt werden. Die Bundesanstalt für Gewässer&shy;kunde veröffentlicht regelmäßig Informationen zu Hochwassergefahren. Diese werden dabei in verschiedene Klassen nach Wahrscheinlichkeit eingeteilt. Für deine PLZ gibt es nur ')}Regionen mit einer <strong style="color:${fluvial_flood_low};">sehr geringen Wahrscheinlichkeit</strong> für Hochwasser (einmal in 200 Jahren).`,
      },
      layers: [
        {
          key: 'postcode_geom',
          annotations: [
            {
              text: (json) =>
                `Deine Postleitzahl <strong>${getPostcode(
                  json.postcode
                )}</strong>`,
            },
          ],
        },
        {
          key: 'fluvial_flood',
          type: ['L'],
          annotations: [
            {
              text: (level) => {
                switch (level) {
                  case 'L':
                    return `<span class="bold" style="color: ${fluvial_flood_low}">Sehr geringe Wahrscheinlichkeit</span>`
                    break
                  case 'M':
                    return `<span class="bold" style="color: ${fluvial_flood_medium}">Geringe Wahrscheinlichkeit</span>`
                    break
                  case 'H':
                    return `<span class="bold" style="color: ${fluvial_flood_high}">Hohe Wahrscheinlichkeit</span>`
                    break
                }
              },
            },
          ],
        },
      ],
    },
    {
      step: '1.10',
      showMinimap: true,
      text: {
        title: 'Küstengebiete',
        paragraph:
          'Gebiete in Küstennähe, sind darüber hinaus auch dem klimabedingten Anstieg des Meeresspiegels und vermehrten <span class="storm-surge bold">Sturmfluten</span> ausgesetzt.',
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
              text: (json) =>
                `Deine Postleitzahl <strong>${getPostcode(
                  json.postcode
                )}</strong>`,
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
        title: 'Temperaturentwicklung',
        paragraph:
          'Besonders deutlich wird die klimawandelbedingte Entwicklung, wenn man sich die Jahreswerte der Temperaturen der letzten Jahre anschaut.',
      },
    },
    {
      step: '2.2',
      data: 'merged',
      datakey: 'air_temperature_max',
      show: ['min', 'minToMax'],
      text: {
        title: 'Temperaturentwicklung',
        paragraph:
          'Hier zu sehen sind die <span class="warm bold dot">höchsten</span> und <span class="cold dot bold">niedrigsten</span> Temperaturen der letzten Jahre für deine Region.',
      },
    },
    {
      step: '2.3',
      data: 'merged',
      datakey: 'air_temperature_max',
      show: ['min', 'max', 'yPostcode'],
      text: {
        title: 'Zunehmender Trend',
        paragraph:
          'Betrachtet man neben den Extremen, den <strong style="color:grey;">Durchschnitt</strong>, lässt sich in den meisten Regionen ein langsamer Anstieg erkennen.',
      },
    },
    {
      step: '2.4',
      data: 'merged',
      datakey: 'air_temperature_max',
      show: ['min', 'max', 'yPostcode', 'yGermany'],
      text: {
        title: 'Deutscher Durchschnitt',
        paragraph:
          'Dieser Ansteig wird auch im <strong>Deutschen Durchschnitt</strong> deutlich, der von lokalen Veränderungen leicht abweichen kann.',
      },
    },
  ],
}

export const zipcodesUrl = `${s3Url}postcodes.txt`

export const metadata = {
  authors: 'Sebastian Meier | @seb_meier, Fabian Dinklage | @fdnklg',
  lang: 'de',
  twitter_site: '@seb_meier',
  twitter_creator: '',
  url: 'https://klima-risiken.vislab.io',
  title: 'Klimawandelrisiken in Deutschland',
  description:
    'Der Klimawandel ist längst in Deutschland angekommen. In den nächsten Jahren und Jahrzehnten, werden wir die Auswirkungen immer deutlicher spüren. Die lokalen Risiken sind stark davon abhängig wo man in Deutschland wohnt. Finde auf dieser Seite heraus, welchen Herausforderungen sich deine Region stellen muss.',
  image: 'https://klima-risiken.vislab.io/data/social_media.jpg',
}
