import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const babelConfig = require("./babel.config.js")

export default {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: ["app/**/*.{js,jsx,ts,tsx}", "mdx-components.tsx"],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: babelConfig.plugins,
      },
      useCSSLayers: true,
    },
    autoprefixer: {},
  },
}
