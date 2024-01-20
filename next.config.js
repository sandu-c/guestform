// next.config.js
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    cssLoaderOptions: {
        url: false
    }
});

const repo = 'sandu-c'

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = '/'

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

module.exports = {
  assetPrefix: assetPrefix,
  basePath: basePath,
}

// module.exports = {
//   // …
//   images: {
//     loader: 'imgix',
//     path: 'the "domain" of your Imigix source',
//   },
// }
