// next.config.js

// const cssConfig = {
//     cssLoaderOptions: {
//       url: false,
//     },
//   };

const repo = "";
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\/.*?\//, "");

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

module.exports = {
  // Your other configurations...
  // ...cssConfig, // Add the CSS configuration
  assetPrefix: assetPrefix,
  basePath: basePath,
  // Serve static files directly
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/:path*",
  //     },
  //   ];
  // },
  output: 'export'
};
