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
        WPGraphQL_Post: {
            modifiedForUser: {
                type: 'String',
                resolve(source, args, context, info) {
                    if (source.modified) {
                        return moment(source.modified).format('D MMMM YYYY')
                    }
                    return null
                },
            },
            modifiedForSchema: {
                type: 'String',
                resolve(source, args, context, info) {
                    if (source.modified) {
                        return moment(source.modified).format(
                            'YYYY-MM-DD, HH:mm:ss'
                        )
                    }
                    return null
                },
            },
            publishedForUser: {
                type: 'String',
                resolve(source, args, context, info) {
                    if (source.date) {
                        return moment(source.date).format('D MMMM YYYY')
                    }
                    return null
                },
            },
            publishedForSchema: {
                type: 'String',
                resolve(source, args, context, info) {
                    if (source.date) {
                        return moment(source.date).format(
                            'YYYY-MM-DD, HH:mm:ss'
                        )
                    }
                    return null
                },
            },
            updatedAfterMonth: {
                type: 'Boolean',
                resolve(source, args, context, info) {
                    if (source.date) {
                        const months = moment(new Date(source.modified)).diff(
                            new Date(source.date),
                            'months',
                            true
                        )
                        if (months > 1) {
                            return true
                        }
                    }
                    return false
                },
            },
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
        WPGraphQL_MediaItem: {
            imageFile: {
                type: `File`,
                async resolve(source, args, context, info) {
                    if (source.sourceUrl) {
                        let fileNodeID
                        let fileNode
                        let sourceModified

                        // Set the file cacheID, get it (if it has already been set)
                        const mediaDataCacheKey = `wordpress-media-${source.databaseId}`
                        const cacheMediaData = await cache.get(
                            mediaDataCacheKey
                        )

                        if (source.modified) {
                            sourceModified = source.modified
                        }

                        // If we have cached media data and it wasn't modified, reuse
                        // previously created file node to not try to redownload
                        if (
                            cacheMediaData &&
                            sourceModified === cacheMediaData.modified
                        ) {
                            fileNode = getNode(cacheMediaData.fileNodeID)

                            // check if node still exists in cache
                            // it could be removed if image was made private
                            if (fileNode) {
                                fileNodeID = cacheMediaData.fileNodeID
                                // https://www.gatsbyjs.org/docs/node-creation/#freshstale-nodes
                                touchNode({
                                    nodeId: fileNodeID,
                                })
                            }
                        }

                        // If we don't have cached data, download the file
                        if (!fileNodeID) {
                            try {
                                // Get the filenode
                                fileNode = await createRemoteFileNode({
                                    url: source.sourceUrl,
                                    store,
                                    cache,
                                    createNode,
                                    createNodeId,
                                    reporter,
                                })

                                if (fileNode) {
                                    fileNodeID = fileNode.id

                                    await cache.set(mediaDataCacheKey, {
                                        fileNodeID,
                                        modified: sourceModified,
                                    })
                                }
                            } catch (e) {
                                // Ignore
                                // eslint-disable-next-line
                                console.log(e)
                                return null
                            }
                        }

                        if (fileNode) {
                            return fileNode
                        }
                    }
                    return null
                },
            },
        },
    })
}
