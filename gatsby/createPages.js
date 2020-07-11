// const getRelatedPosts = require('./getRelatedPosts.js')
const createPages = require('./create/pages.js')
const createPosts = require('./create/posts.js')

module.exports = async function createPages(props) {
    // const tagTemplate = path.resolve('src/templates/tags.js')
    // const categoryTemplate = path.resolve('src/templates/categories.js')

    const { graphql } = props

    const { data: wpSettings } = await graphql(`
        {
            wp {
                readingSettings {
                    postsPerPage
                }
            }
        }
    `)

    const perPage = wpSettings.wp.readingSettings.postsPerPage || 10

    await createPages(props)
    await createPosts(props, { perPage, blogURI: '/' })
}
