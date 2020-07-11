const path = require(`path`)

module.exports = async ({ actions, graphql }) => {
    const { data } = await graphql(/* GraphQL */ `
        {
            allWpPage(sort: { fields: modifiedGmt, order: DESC }) {
                nodes {
                    uri
                    id
                }
            }
        }
    `)

    // Make individual pages.
    await Promise.all(
        data.allWpPost.nodes.map(async (page, index) => {
            await actions.createPage({
                component: path.resolve('src/templates/page.js'),
                path: post.uri,
                context: {
                    id: page.id,
                },
            })
        })
    )
}
