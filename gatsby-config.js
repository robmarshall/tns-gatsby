module.exports = {
  siteMetadata: {
    title: `Thoughts and Stuff`,
    description: `Fetch data from WP`,
    subtitle: `Fetch data from WP`,
    author: `@RobMarProd`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
          baseUrl: `thoughtsandstuff.com`,
          protocol: `http`,
          hostingWPCOM: false,
          useACF: false,
          verboseOutput: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
