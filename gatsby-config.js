const activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

// eslint-disable-next-line
console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
    path: `.env.${activeEnv}`,
})

const reusables = {
    author: 'Robert Marshall',
    title: `Rob Marshall`,
    description: `Web Developer, building with React, Headless WordPress and Gatsby.`,
    url: `https://robertmarshall.dev`,
}

module.exports = {
    siteMetadata: {
        locale: `en_GB`, // Fallback
        title: reusables.title,
        description: reusables.description,
        author: `@robertmars`,
        siteUrl: reusables.url,
        facebookAppID: `xxx`,
    },
    plugins: [
        `gatsby-plugin-preact`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                output: '/',
            },
        },
        `gatsby-plugin-robots-txt`,
        `gatsby-plugin-force-trailing-slashes`,
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: process.env.GATSBY_BASE_URL || '',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images/`,
            },
        },
        {
            resolve: `gatsby-source-wordpress`,
            options: {
                url: process.env.GATSBY_SOURCE_URL,
                verbose: true,
                schema: {
                    perPage: 2,
                    timeout: 60000,
                    requestConcurrency: 2,
                },
                searchAndReplace: [
                    {
                        search: process.env.GATSBY_BACKEND_URL,
                        replace: process.env.GATSBY_BASE_URL,
                    },
                ],
                develop: {
                    hardCacheMediaFiles: true,
                },
                type: {
                    __all: {
                        limit: process.env.NODE_ENV === `development` && 10,
                    },
                    MediaItem: {
                        localFile: {
                            requestConcurrency: 10,
                        },
                    },
                    Post: {
                        limit:
                            process.env.NODE_ENV === `development`
                                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                                  50
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
                                    url: `${site.siteMetadata.siteUrl}/${node.uri}`,
                                    guid: `${site.siteMetadata.siteUrl}/${node.uri}`,
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
                        uri
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
                        title: `${reusables.title} Blog Feed`,
                        description:
                            'Advice, hints and tips on developing with React, Headless WordPress, Gatsby and Jest',
                        managingEditor: reusables.author,
                    },
                ],
            },
        },
        `gatsby-plugin-sass`,
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaultQuality: 90,
            },
        },
        {
            resolve: 'gatsby-plugin-html-attributes',
            options: {
                lang: 'en',
            },
        },
        {
            resolve: `gatsby-plugin-webfonts`,
            options: {
                fonts: {
                    google: [
                        {
                            family: 'Merriweather',
                            variants: ['400', '700'],
                            fontDisplay: 'swap',
                            strategy: 'base64',
                        },
                    ],
                },
            },
        },
        {
            resolve: `gatsby-plugin-plausible`,
            options: {
                domain: `robertmarshall.dev`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: reusables.title,
                short_name: `RMD`,
                description: reusables.description,
                lang: `en`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#fff`,
                display: `standalone`,
                icon: `src/favicon.png`,
            },
        },
        {
            resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
        },
        {
            resolve: `gatsby-plugin-minify-classnames`,
            options: {
                dictionary:
                    'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0123456789',
                enable: activeEnv !== 'development',
            },
        },
        `gatsby-plugin-netlify`,
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
