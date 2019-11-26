const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

// eslint-disable-next-line
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
      resolve: `gatsby-source-graphql`,
      options: {
        // This type will contain remote schema Query type
        typeName: `WPGraphQL`,
        // This is field under which it's accessible
        fieldName: `wpgraphql`,
        // Url to query from
        url: "http://rest.thoughtsandstuff.com/graphql"
      }
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
            serialize: ({ query: { site, wpgraphql } }) => {
              return wpgraphql.posts.nodes.map(node => {
                return {
                  ...node,
                  description: node.excerpt,
                  date: node.date,
                  url: `${site.siteMetadata.siteUrl}/${node.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/${node.slug}`,
                  categories:
                    node.categories.nodes.length > 0
                      ? node.categories.nodes.map(cat => {
                          return cat.name;
                        })
                      : "",
                  custom_elements: [{ "content:encoded": node.content }]
                };
              });
            },
            query: `
                  {
                    wpgraphql {
                      posts(first: 2000) {
                        nodes {
                          title
                          slug
                          excerpt
                          content
                          categories {
                            nodes {
                              name
                            }
                          }
                          date
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
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 90
      }
    },
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Thoughts and Stuff`,
        short_name: `T&S`,
        description: `Website Design and Development Inspiration`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#532ee7`,
        display: `standalone`,
        icon: `src/favicon.png`
      }
    },
    {
      resolve: "gatsby-wpgraphql-inline-images",
      options: {
        wordPressUrl: "http://rest.thoughtsandstuff.com/",
        uploadsUrl: "http://rest.thoughtsandstuff.com/wp-content/uploads/",
        processPostTypes: ["Page", "Post"],
        graphqlTypeName: "WPGraphQL",
        generateWebp: true
      }
    },
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-plugin-netlify-cache",
      options: {
        cachePublic: true
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    "gatsby-plugin-offline"
  ]
};
