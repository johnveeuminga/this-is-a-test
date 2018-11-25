import vue from 'rollup-plugin-vue'
import uglify from 'rollup-plugin-uglify-es'
import babel from 'rollup-plugin-babel'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/main.js',
  output: {
    name: 'sharedFooter',
    exports: 'named'
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
      template: { optimizeSSR: true }
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify())
}

export default config;