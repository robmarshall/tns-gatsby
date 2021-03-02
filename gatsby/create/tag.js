const path = require(`path`)
const chunk = require(`lodash/chunk`)

module.exports = async ({ actions, graphql }, options) => {
    const { perPage } = options

    const { data: tagData } = await graphql(/* GraphQL */ `
        {
            allWpTag {
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
        tagData.allWpTag.nodes.map(async (tag, index) => {
            const { data } = await graphql(/* GraphQL */ `
                {
                  allWpPost(
                    filter: {
                      tags: {
                        nodes: {
                          elemMatch: { databaseId: { eq: ${tag.databaseId} } }
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

            const tagPath = tag.uri

            await Promise.all(
                chunkedContentNodes.map(async (nodesChunk, index) => {
                    const firstNode = nodesChunk[0]

                    await actions.createPage({
                        component: path.resolve('src/templates/tags.js'),
                        path:
                            index === 0
                                ? tagPath
                                : `${tagPath}page/${index + 1}/`,
                        context: {
                            archivePath: tagPath,
                            name: tag.name,
                            description: tag.description,
                            id: tag.databaseId,
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
