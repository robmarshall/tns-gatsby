/**
 * A fetcher to loop through the query and get all posts
 *
 * Use the env variable GATSBY_PAGESTOLOAD to reduce the pages loaded if
 * working in a dev enviroment and do not want to download all posts
 *
 * @param func graphql GraphQl function from Gatsby
 * @param string postType Post type slug
 * @param object query The query to pass to GraphQl
 * @return object he resulting data from GraphQl
 */

module.exports = async function fetcher({ graphql, postType, query }) {
    const allPosts = []

    let currentPageCount = 20

    // If the WP hosting provider is slow, reduce this
    // otherwise your build may crash
    let queryAmount = 10

    if (process.env.GATSBY_PAGESTOLOAD) {
        queryAmount = 20
    }

    const devPageLimiter = (count) => {
        if (process.env.GATSBY_PAGESTOLOAD) {
            if (count >= process.env.GATSBY_PAGESTOLOAD) {
                return false
            }
        }
        return true
    }

    const fetchPosts = async (variables) =>
        graphql(query, variables).then(async ({ data }) => {
            console.log(data[`allWp${postType}`].pageInfo)
            // eslint-disable-next-line
            if (data[`allWp${postType}`]) {
                const { pageCount, totalCount } = data[
                    `allWp${postType}`
                ].pageInfo

                data[`allWp${postType}`].nodes.forEach((post) => {
                    allPosts.push(post)
                })

                const hasNextPage = queryAmount * currentPageCount < totalCount

                if (hasNextPage && devPageLimiter(currentPageCount)) {
                    currentPageCount = +1
                    return fetchPosts({
                        skip: queryAmount * currentPageCount,
                        limit: queryAmount,
                    })
                }
            }

            return allPosts
        })

    return fetchPosts({ skip: 0, limit: queryAmount }).then((result) => {
        return result
    })
}
