module.exports = function getRelatedPosts({ posts, current, sortBy }) {
    const postCount = posts.length
    let i = 0
    const relatedPosts = []

    if (postCount > 0) {
        // Get types to match from current post
        if (sortBy !== 'rand' && current[sortBy]) {
            const thisTypes = current[sortBy]

            // If not random, and we have types to match
            if (thisTypes) {
                // Use while so we can break out
                while (i < postCount) {
                    // Not the current post!
                    if (posts[i].id !== current.id) {
                        // Does the type exist?
                        if (posts[i][sortBy]) {
                            // Loop through this loop post
                            const foundMatch = posts[i][sortBy].some((item) => {
                                // If this name, matches the current name, return true
                                return thisTypes.some((inner) => {
                                    return inner.name === item.name
                                })
                            })

                            if (foundMatch) {
                                relatedPosts.push(posts[i])

                                // If we have all, exit loop
                                if (relatedPosts.length >= 3) {
                                    break
                                }
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
            const picked = []
            while (p < postCount) {
                const randInt = Math.floor(Math.random() * (postCount - 1)) + 1
                // Not the current post! or already included
                if (randInt !== current.id || picked.includes(randInt)) {
                    picked.push(randInt)
                    relatedPosts.push(posts[p])
                    // If we have all, exit loop
                    if (relatedPosts.length >= 3) {
                        break
                    }
                }
                p = +1
            }
        }
    }
    return relatedPosts
}
