const activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

// eslint-disable-next-line
console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
    path: `.env.${activeEnv}`,
})

module.exports = {
    siteMetadata: {
        locale: `en_GB`, // Fallback
        siteName: `T&S`, // Fallback
        title: `Website Design and Development Inspiration`,
        description: `Website Design and Development Inspiration`,
        author: `@RobMarProd`,
        url: `https://thoughtsandstuff.com`,
        siteUrl: `https://thoughtsandstuff.com`,
        facebookAppID: `xxx`,
    },
    plugins: [
        `gatsby-plugin-preact`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-robots-txt`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images/`,
            },
        },
        {
            resolve: `gatsby-source-wordpress-experimental`,
            options: {
                url: process.env.GATSBY_SOURCE_URL,
                verbose: true,
                schema: {
                    perPage: 10,
                },
                develop: {
                    hardCacheMediaFiles: true,
                },
                type: {
                    Post: {
                        limit:
                            process.env.NODE_ENV === `development`
                                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                                  5000
                                : // and we don't actually need more than 5000 in production for this particular site
                                  5000,
                    },
                },
                html: {
                    imageMaxWidth: 700,
                },
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
                        serialize: ({ query: { site, allWpPost } }) => {
                            return allWpPost.nodes.map((node) => {
                                return {
                                    ...node,
                                    description: node.excerpt,
                                    date: node.date,
                                    url: `${site.siteMetadata.siteUrl}/${node.slug}`,
                                    guid: `${site.siteMetadata.siteUrl}/${node.slug}`,
                                    categories:
                                        node.categories.nodes.length > 0
                                            ? node.categories.nodes.map(
                                                  (cat) => {
                                                      return cat.name
                                                  }
                                              )
                                            : '',
                                    custom_elements: [
                                        { 'content:encoded': node.content },
                                    ],
                                }
                            })
                        },
                        query: `
                  {
                    allWpPost {
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
                `,
                        output: '/rss.xml',
                        title: 'T&S RSS Feed',
                        description:
                            'Website Design and Development Inspiration',
                        managingEditor: 'Robert Marshall',
                    },
                ],
            },
        },
        `gatsby-plugin-sass`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaultQuality: 100,
            },
        },
        {
            resolve: 'gatsby-plugin-html-attributes',
            options: {
                lang: 'en',
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [`Merriweather\:400,700`],
                display: 'swap',
            },
        },
        {
            resolve: 'gatsby-plugin-preload-fonts',
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GOOGLE_TRACKING_ID || '',
                // Puts tracking script in the head instead of the body
                head: true,
                // Enables Google Optimize using your container Id
                optimizeId: process.env.GOOGLE_OPTIMIZE_ID || '',
                // Enables Google Optimize Experiment ID
                experimentId: process.env.GOOGLE_EXPERIMENT_ID || '',
                // Set Variation ID. 0 for original 1,2,3....
                variationId: process.env.GOOGLE_VARIATION_ID || '',
            },
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
                icon: `src/favicon.png`,
            },
        },
        {
            resolve: 'gatsby-plugin-webpack-bundle-analyzer',
            options: {
                production: true,
            },
        },
        `gatsby-plugin-netlify`,
        {
            resolve: 'gatsby-plugin-netlify-cache',
            options: {
                cachePublic: true,
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                appendScript: require.resolve('./arc-sw.js'),
            },
        },
    ],
}
