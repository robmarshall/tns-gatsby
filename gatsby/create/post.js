const path = require(`path`)
const chunk = require(`lodash/chunk`)

module.exports = async ({ actions, graphql }, options) => {
    const { perPage, blogURI } = options

    const { data } = await graphql(/* GraphQL */ `
        {
            allWpPost(sort: { fields: modifiedGmt, order: DESC }) {
                nodes {
                    uri
                    id
                }
            }
        }
    `)

    // Make individual posts.
    await Promise.all(
        data.allWpPost.nodes.map(async (post, index) => {
            await actions.createPage({
                component: path.resolve('src/templates/post.js'),
                path: post.uri,
                context: {
                    id: post.id,
                },
            })
        })
    )

    // Make post listing.
    const chunkedContentNodes = chunk(data.allWpPost.nodes, perPage)

    await Promise.all(
        chunkedContentNodes.map(async (nodesChunk, index) => {
            const firstNode = nodesChunk[0]

            await actions.createPage({
                component: path.resolve('src/templates/posts.js'),
                path: index === 0 ? blogURI : `${blogURI}page/${index + 1}/`,
                context: {
                    archivePath: blogURI,
                    offset: perPage * index,
                    pageNumber: index + 1,
                    perPage,
                },
            })
        })
    )
}
