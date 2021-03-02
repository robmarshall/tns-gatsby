const path = require(`path`)
const chunk = require(`lodash/chunk`)

module.exports = async ({ actions, graphql }, options) => {
    const { perPage } = options

    const { data: categoryData } = await graphql(/* GraphQL */ `
        {
            allWpCategory {
                nodes {
                    databaseId
                    description
                    uri
                    name
                }
            }
        }
    `)

    // Make cat listing.
    await Promise.all(
        categoryData.allWpCategory.nodes.map(async (category, index) => {
            const { data } = await graphql(/* GraphQL */ `
                {
                  allWpPost(
                    filter: {
                      categories: {
                        nodes: {
                          elemMatch: { databaseId: { eq: ${category.databaseId} } }
                        }
                      }
                    }
                    sort: { fields: date, order: DESC }
                  ) {
                    nodes {
                      uri
                      databaseId
                    }
                  }
                }
              `)

            const chunkedContentNodes = chunk(data.allWpPost.nodes, perPage)

            const categoryPath = category.uri

            await Promise.all(
                chunkedContentNodes.map(async (nodesChunk, index) => {
                    const firstNode = nodesChunk[0]

                    await actions.createPage({
                        component: path.resolve('src/templates/categories.js'),
                        path:
                            index === 0
                                ? categoryPath
                                : `${categoryPath}page/${index + 1}/`,
                        context: {
                            archivePath: categoryPath,
                            name: category.name,
                            description: category.description,
                            id: category.databaseId,
                            offset: perPage * index,
                            pageNumber: index + 1,
                            perPage,
                        },
                    })
                })
            )
        })
    )
}
