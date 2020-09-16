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

function cleanTitle(source) {
    return he.unescape(source?.title || '')
}

function cleanSeoTitle(source) {
    return he.unescape(source?.title || '')
}

function cleanExcerpt(source) {
    const seo = source?.seo?.metaDesc
    const excerpt = source?.excerpt
    const content = source?.content

    const toClean = he.unescape(seo || excerpt || content || '')
    const noTags = stripTags(toClean)
    const lengthCorrected = limitString(noTags, 180)

    return lengthCorrected.replace(/(\r\n|\n|\r)/gm, '')
}

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
        WpPage: {
            cleanTitle: {
                type: 'String',
                resolve(source) {
                    return cleanTitle(source)
                },
            },
        },
        WpPost: {
            cleanTitle: {
                type: 'String',
                resolve(source) {
                    return cleanTitle(source)
                },
            },
            cleanExcerpt: {
                type: 'String',
                resolve(source) {
                    return cleanExcerpt(source)
                },
            },
        },
    })
}
