import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import sveltePreprocess from 'svelte-preprocess'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import svg from 'rollup-plugin-svg-import'
import alias from '@rollup/plugin-alias'
import { config } from 'dotenv'
import analyze from 'rollup-plugin-analyzer'

const production = !process.env.ROLLUP_WATCH

function serve() {
  let server

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      )

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    },
  }
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  // external: ['mapbox-gl'],
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        defaults: {
          style: 'scss',
        },
      }),
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write('bundle.css')
      },
    }),
    replace({
      __env__: JSON.stringify({
        isProd: production,
        ...config().parsed,
      }),
    }),
    svg({
      // process SVG to DOM Node or String. Default: false
      stringify: true,
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    alias({
      resolve: ['.svelte', '.js'],
      entries: [
        { find: 'constants', replacement: 'src/constants.js' },
        { find: 'components', replacement: 'src/components' },
        { find: 'stores', replacement: 'src/stores.js' },
        { find: 'utils', replacement: 'src/utils/index.js' },
        { find: 'annotation', replacement: 'src/utils/annotation.js' },
        { find: 'views', replacement: 'src/views/' },
        { find: 'core', replacement: 'src/core/' },
        { find: 'config', replacement: 'src/config.js' },
      ],
    }),
    analyze({ summaryOnly: true }),
  ],
  watch: {
    clearScreen: false,
  },
}
