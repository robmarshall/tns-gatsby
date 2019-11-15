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
                url: "http://rest.thoughtsandstuff.com/graphql",
            },
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
                                return { ...edge.node, description: edge.node.excerpt,
                                    date: edge.node.date,
                                    url: `${site.siteMetadata.siteUrl  }/${  edge.node.slug}`,
                                    guid: `${site.siteMetadata.siteUrl  }/${  edge.node.slug}`,
                                    categories:
                    edge.node.categories.length > 0
                        ? edge.node.categories.map(cat => {
                            return cat.name;
                        })
                        : "",
                                    custom_elements: [{ "content:encoded": edge.node.content }]};
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
