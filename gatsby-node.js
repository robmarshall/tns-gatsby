const _ = require(`lodash`)
const path = require(`path`)
const slash = require(`slash`)
const queryPages = require(`./src/queries/queryPages.js`)
const queryPosts = require(`./src/queries/queryPosts.js`)
const createPaginatedPages = require('gatsby-paginate')

const fetcher = require(`./src/queries/fetcher.js`)

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
// const getRelatedPosts = require('./utils/getRelatedPosts.js')

exports.createPages = async ({ graphql, actions }) => {
    // Templates
    const pageTemplate = path.resolve('./src/templates/page.js')
    const postTemplate = path.resolve('./src/templates/post.js')
    const postsTemplate = path.resolve('./src/templates/posts.js')
    const tagTemplate = path.resolve('./src/templates/tags.js')
    const categoryTemplate = path.resolve('./src/templates/categories.js')

    const { createPage } = actions

    // eslint-disable-next-line
    console.log('Getting Pages')

    await fetcher({
        graphql,
        postType: "pages",
        query: queryPages
    }).then(async pages => {
        if (pages) {
            pages.forEach(node => {
                createPage({
                    path: `/${node.slug}/`,
                    component: slash(pageTemplate),
                    context: {
                        page: node,
                    },
                })
            })
        }
    })

    // eslint-disable-next-line
    console.log('Getting Posts')

    await fetcher({
        graphql,
        postType: "posts",
        query: queryPosts
    }).then(async posts => {

        if(posts){

            // Posts detail
            const tags = []
            const categories = []

            createPaginatedPages({
                edges: posts,
                createPage,
                pageTemplate: postsTemplate,
                pageLength: 8,
                pathPrefix: '',
                buildPath: (index, pathPrefix) =>
                    index > 1
                        ? `${pathPrefix}/page/${index}`
                        : `/${pathPrefix}`,
            })

            posts.forEach(node => {
            // Grab all the tags and categories for later use
                if (node.tags) {
                    node.tags.nodes.forEach(tag => {
                        tags.push(tag.name)
                    })
                }

                if (node.categories) {
                    node.categories.nodes.forEach(category => {
                        categories.push(category.name)
                    })
                }

                createPage({
                    path: `/${node.slug}/`,
                    component: slash(postTemplate),
                    context: {
                        post: node,
                    },
                })
            })

            const tagSet = new Set()
            const tagMap = new Map()
            const categorySet = new Set()
            const categoryMap = new Map()

            // Now loop through posts, and allocated posts to tags/cats
            posts.forEach(node => {
                if (node.tags) {
                    node.tags.nodes.forEach(tag => {
                        tagSet.add(tag)
                        const array = tagMap.has(tag.name)
                            ? tagMap.get(tag.name)
                            : []
                        array.push(node)
                        tagMap.set(tag.name, array)
                    })
                }

                if (node.categories) {
                    node.categories.nodes.forEach(category => {
                        categorySet.add(category)
                        const array = categoryMap.has(category.name)
                            ? categoryMap.get(category.name)
                            : []
                        array.push(node)
                        categoryMap.set(category.name, array)
                    })
                }
            })

            // Create paginated tag/cat pages
            const tagList = Array.from(tagSet)
            const categoryList = Array.from(categorySet)

            tagList.forEach(tag => {
                createPaginatedPages({
                    edges: tagMap.get(tag.name),
                    createPage,
                    pageTemplate: tagTemplate,
                    pageLength: 8,
                    pathPrefix: 'tag',
                    buildPath: (index, pathPrefix) =>
                        index > 1
                            ? `${pathPrefix}/${_.kebabCase(
                                tag.name
                            )}/page/${index}`
                            : `/${pathPrefix}/${_.kebabCase(tag.name)}`,
                    context: {
                        tagName: tag.name,
                        tagDescription: tag.description,
                    },
                })
            })

            categoryList.forEach(category => {
                createPaginatedPages({
                    edges: categoryMap.get(category.name),
                    createPage,
                    pageTemplate: categoryTemplate,
                    pageLength: 8,
                    pathPrefix: 'category',
                    buildPath: (index, pathPrefix) =>
                        index > 1
                            ? `${pathPrefix}/${_.kebabCase(
                                category.name
                            )}/page/${index}`
                            : `/${pathPrefix}/${_.kebabCase(category.name)}`,
                    context: {
                        catName: category.name,
                        catDescription: category.description,
                    },
                })

            })

        }
    })

}


/**
 * Custom resolver to add all items from Media items (media libary)
 * to Gatsby. So we can use them as Gatsby images.
 *
 * To work properly, in image queries also query
 * - sourceUrl
 * - mediaItemId
 * - modified
 *
 * Otherwise resolver doesn't work
 */

/**
 * Map over items array using the fn function but wait for each step to finish before moving to the next one
 */

exports.createResolvers = ({
    actions,
    cache,
    createNodeId,
    createResolvers,
    getNode,
    store,
    reporter,
}) => {
    const { createNode, touchNode } = actions

    // Add all media libary images so they can be queried by
    // childImageSharp
    createResolvers({
        WPGraphQL_MediaItem: {
            imageFile: {
                type: `File`,
                async resolve(source, args, context, info) {
                    if (source.sourceUrl) {
                        let fileNodeID
                        let fileNode
                        let sourceModified

                        // Set the file cacheID, get it (if it has already been set)
                        const mediaDataCacheKey = `wordpress-media-${source.mediaItemId}`
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
                                    auth: {
                                        htaccess_user:
                                            process.env.BASIC_AUTH_USER,
                                        htaccess_pass:
                                            process.env.BASIC_AUTH_PASS,
                                    },
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
