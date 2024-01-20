// next.config.js

const cssConfig = {
    cssLoaderOptions: {
        url: false
    }
};

// module.exports = withCSS();

const repo = ''
const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = '/'

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

const nextConfig = {
    assetPrefix: assetPrefix,
    basePath: basePath,
};

const withCSS = require('@zeit/next-css');
module.exports = withCSS;

// module.exports = {
//   // …
//   images: {
//     loader: 'imgix',
//     path: 'the "domain" of your Imigix source',
//   },
// }
