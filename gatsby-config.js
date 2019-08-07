let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

console.log(`Using environment config: '${activeEnv}'`);

require("dotenv").config({
  path: `.env.${activeEnv}`
});

module.exports = {
  siteMetadata: {
    locale: `en_GB`, // Fallback
    siteName: `T&S`, // Fallback
    title: `Website Design and Development Inspiration`,
    description: `Website Design and Development Inspiration`,
    author: `@RobMarProd`,
    url: `https://thoughtsandstuff.com`,
    siteUrl: `https://thoughtsandstuff.com`,
    facebookAppID: `xxx`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `rest.thoughtsandstuff.com`,
        protocol: `http`,
        hostingWPCOM: false,
        useACF: false,
        verboseOutput: true,
        // searchAndReplaceContentUrls: {
        //     sourceUrl: 'https://rest.thoughtsandstuff.com',
        //     replacementUrl: 'https://thoughtsandstuff.com',
        // },
        auth: {
          jwt_user: process.env.JWT_USER,
          jwt_pass: process.env.JWT_PASSWORD
        },
        includedRoutes: [
          "/*/*/menus",
          "**/categories",
          "**/posts",
          "**/pages",
          "**/media",
          "**/tags",
          "**/taxonomies",
          "**/users",
          "/*/*/settings"
        ]
      }
      // Doesnt seem to work yet...
      // plugins: [
      //     {
      //         resolve: `gatsby-wordpress-inline-images`,
      //         options: {
      //             baseUrl: `rest.thoughtsandstuff.com`,
      //             protocol: `http`,
      //         },
      //     },
      // ],
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
              {
                site {
                  siteMetadata {
                    title
                    description
                    siteUrl
                    site_url: siteUrl
                  }
                }
              }
            `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressPost } }) => {
              return allWordpressPost.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node.excerpt,
                  date: edge.node.date,
                  url: site.siteMetadata.siteUrl + "/" + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + "/" + edge.node.slug,
                  categories:
                    edge.node.categories.length > 0
                      ? edge.node.categories.map(cat => {
                          return cat.name;
                        })
                      : "",
                  custom_elements: [{ "content:encoded": edge.node.content }]
                });
              });
            },
            query: `
                  {
                    allWordpressPost (
                        sort: { fields: [date], order: DESC }
                        filter: { status: { eq: "publish" } }
                    ) {
                      edges {
                        node {
                          title
                          slug
                          excerpt
                          content
                          categories {
                            name
                          }
                          date(formatString:"YYYY-MM-DD, HH:mm:ss")
                        }
                      }
                    }
                  }
                `,
            output: "/rss.xml",
            title: "T&S RSS Feed",
            description: "Website Design and Development Inspiration",
            managingEditor: "Robert Marshall"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",

        // WebApp Manifest Configuration
        appName: "TnS", // Inferred with your package.json
        appDescription: "Website Design and Development Inspiration",
        developerName: "Robert Marshall",
        developerURL: "robertmarshall.dev",
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#fff",
        display: "standalone",
        orientation: "any",
        start_url: "/?homescreen=1",
        version: "1.0",
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "en"
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Merriweather`,
            variants: [`400`, `700`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_TRACKING_ID || "",
        // Puts tracking script in the head instead of the body
        head: true,
        // Enables Google Optimize using your container Id
        optimizeId: process.env.GOOGLE_OPTIMIZE_ID || "",
        // Enables Google Optimize Experiment ID
        experimentId: process.env.GOOGLE_EXPERIMENT_ID || "",
        // Set Variation ID. 0 for original 1,2,3....
        variationId: process.env.GOOGLE_VARIATION_ID || ""
      }
    },
    `gatsby-plugin-netlify`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    "gatsby-plugin-offline"
  ]
};
