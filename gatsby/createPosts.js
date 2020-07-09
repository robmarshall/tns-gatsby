const path = require(`path`)
const chunk = require(`lodash/chunk`)

module.exports = async ({ actions, graphql }, options) => {
    const postsTemplate = path.resolve('src/templates/posts.js')

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

    const chunkedContentNodes = chunk(data.allWpPost.nodes, perPage)

    await Promise.all(
        chunkedContentNodes.map(async (nodesChunk, index) => {
            const firstNode = nodesChunk[0]

            await actions.createPage({
                component: postsTemplate,
                path: index === 0 ? blogURI : `${blogURI}page/${index + 1}/`,
                context: {
                    archivePath: blogURI,
                    archiveType: 'post',
                    offset: perPage * index,
                    pageNumber: index + 1,
                    perPage,
                },
            })
        })
    )
}
