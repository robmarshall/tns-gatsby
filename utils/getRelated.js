/**
 * This function finds 3 related posts for the provided 'current' post object.
 * It returns an array of 3 database IDs to be used in an onpage GraphQL query.
 * @param  {array} posts Array of all posts.
 * @param  {object} current Current post object.
 * @param  {string} sortBy category/type name.
 */
module.exports = function getRelated({ allPosts, current, sortBy }) {
    let i = 0
    const relatedPosts = []

    if (allPosts.length > 0) {
        // Remove current post from all posts array.
        const posts = allPosts.filter(
            (post) => post.databaseId !== current.databaseId
        )

        const postCount = posts.length

        // Match nodes types from current post.
        if (sortBy !== 'rand' && current[sortBy]) {
            const thisTypes = current[sortBy].nodes

            // If not random, and we have types to match
            if (thisTypes) {
                // Use while so we can break out
                while (i < postCount) {
                    // Does the type exist?
                    if (posts[i][sortBy]) {
                        // Loop through this loop post
                        const foundMatch = posts[i][sortBy].nodes.some(
                            (item) => {
                                // If this id, matches the current id, return true
                                return thisTypes.some((inner) => {
                                    return inner.databaseId === item.databaseId
                                })
                            }
                        )

                        if (foundMatch) {
                            relatedPosts.push(posts[i].databaseId)

                            // If we have all, exit loop
                            if (relatedPosts.length >= 3) {
                                break
                            }
                        }
                    }

                    i += 1
                }
            }
        }
        // Now get randoms posts to fill/top up the related array
        if (relatedPosts.length < 3) {
            let p = 0
            while (p < postCount - 1) {
                const randInt = Math.floor(Math.random() * (postCount - 1))
                // Not the current post or already included
                if (!relatedPosts.includes(posts[randInt].databaseId)) {
                    relatedPosts.push(posts[randInt].databaseId)
                    // If we have all, exit loop
                    if (relatedPosts.length >= 3) {
                        break
                    }
                }
                p = p + 1
            }
        }
    }

    return relatedPosts
}
