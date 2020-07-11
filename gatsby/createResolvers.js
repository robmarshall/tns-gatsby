const moment = require('moment')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const he = require('he')
const decodeEntities = require(`../utils/decodeEntities.js`)
const limitString = require(`../utils/limitString.js`)
const stripTags = require(`../utils/stripTags.js`)

const activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
    path: `.env.${activeEnv}`,
})

/**
 * Custom resolver to add all items from Media items (media libary)
 * to Gatsby. So we can use them as Gatsby images.
 *
 * To work properly, in image queries also query
 * - sourceUrl
 * - databaseId
 * - modified
 *
 * Otherwise resolver doesn't work
 */

/**
 * Map over items array using the fn function but wait for each step to finish before moving to the next one
 */

module.exports = function createResolvers({
    actions,
    cache,
    createNodeId,
    createResolvers,
    getNode,
    store,
    reporter,
}) {
    const { createNode, touchNode } = actions

    // Add all media libary images so they can be queried by
    // childImageSharp
    createResolvers({
        WpPost: {
            cleanTitle: {
                type: 'String',
                resolve(source, args, context, info) {
                    return he.unescape(source?.title || '')
                },
            },
            cleanExcerpt: {
                type: 'String',
                resolve(source, args, context, info) {
                    const seo = source?.seo.metaDesc || false
                    const excerpt = source?.excerpt || false
                    return he.unescape(stripTags(seo || limitString(excerpt)))
                },
            },
        },
    })
}
