const createPage = require('./create/page.js')
const createPost = require('./create/post.js')
const createCat = require('./create/cat.js')
const createTag = require('./create/tag.js')

module.exports = async function createPages(props) {
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

    await createPage(props)
    await createPost(props, { perPage, blogURI: '/' })
    await createCat(props, { perPage })
    await createTag(props, { perPage })
}
