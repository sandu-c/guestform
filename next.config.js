// next.config.js
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    cssLoaderOptions: {
        url: false
    }
});

const repo = 'sandu-c'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`

module.exports = {
  assetPrefix: assetPrefix,
  basePath: basePath,
}
