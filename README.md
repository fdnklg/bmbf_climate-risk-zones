# BMBF Prototypes

This Repo contains prototypes that do

## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

## TODO

- remove personal mapbox access token before launch

      /*

        postcode...
        postcode_geom > genaue geometrie der plz
        postcode_buff_geom > buffer 5km um die Postleitzahl
        dense_space > In der Mapbox Karte gibt es einen Layer mit den dense spaces, wenn in dense_space was drin ist, dann berührt die plz einen dense space
        fluvial_flood > geometrien der hochwasser gebiete (L: Niedrige wahrscheinlichkeit, M: Mittel, H: Hohe)
        has_ocean_flood: 0 oder 1
        risk_zones: In welcher/welchen Riskzones die plz liegt
        data_germany: klimadaten für deutschland
        data_postcode: klimadaten für plz

        Die Klimadaten sind als Array für jeden Type immer:
        [year, min, avg, max]

        air_temperature_max
        air_temperature_mean
        drought_index
        frost_days
        hot_days
        ice_days
        precipGE30mm_days
        precipitation
        snowcover_days
        summer_days

      */
