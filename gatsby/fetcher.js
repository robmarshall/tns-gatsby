/**
 * A fetcher to loop through the query and get all posts
 *
 * Use the env variable GATSBY_PAGESTOLOAD to reduce the pages loaded if
 * working in a dev enviroment and do not want to download all posts
 *
 * @param func graphql GraphQl function from Gatsby
 * @param string postType Post type slug
 * @param number offset number of posts to ignore before starting count
 * @param object query The query to pass to GraphQl
 * @return object he resulting data from GraphQl
 */

module.exports = async function fetcher({
    graphql,
    postType,
    initialQuery,
    query,
}) {
    const allPosts = []

    let devCounter = 1
    let offset = null

    // If the WP hosting provider is slow, reduce this
    // otherwise your build may crash
    let queryAmount = 10

    if (process.env.GATSBY_PAGESTOLOAD) {
        queryAmount = 2
    }

    const devPageLimiter = (count) => {
        if (process.env.GATSBY_PAGESTOLOAD) {
            if (count >= process.env.GATSBY_PAGESTOLOAD) {
                return false
            }
        }
        return true
    }

    if (initialQuery) {
        await graphql(initialQuery).then(async ({ data }) => {
            // eslint-disable-next-line
            if (data.wpgraphql[postType]) {
                offset = data.wpgraphql[postType].pageInfo.endCursor
                data.wpgraphql[postType].nodes.forEach((post) => {
                    allPosts.push(post)
                })
            }
        })
    }

    const fetchPosts = async (variables) =>
        graphql(query, variables).then(async ({ data }) => {
            // eslint-disable-next-line
            if (data.wpgraphql[postType]) {
                const { hasNextPage, endCursor } = data.wpgraphql[
                    postType
                ].pageInfo

                data.wpgraphql[postType].nodes.forEach((post) => {
                    allPosts.push(post)
                })

                if (hasNextPage && devPageLimiter(devCounter)) {
                    devCounter = +1
                    return fetchPosts({ first: queryAmount, after: endCursor })
                }
            }

            return allPosts
        })

    return fetchPosts({ first: queryAmount, after: offset }).then((result) => {
        return result
    })
}
