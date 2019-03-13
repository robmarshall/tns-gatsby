module.exports = {
  siteMetadata: {
    locale: `en_GB`,
    siteName: `T&S`,
    title: `Website Design and Development Inspiration`,
    description: `Website Design and Development Inspiration`,
    author: `@RobMarProd`,
    url: `tns.com`,
    facebookAppID: `xxx`,
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
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
          lang: 'en'
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Merriweather`,
            variants: [`400`, `700`]
          },
        ],
      },
    }
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
