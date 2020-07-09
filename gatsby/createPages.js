// const path = require(`path`)
// const slash = require(`slash`)
// const createPaginatedPages = require('gatsby-paginate')
//
// const queryPages = require(`./queries/queryPages.js`)
// const queryPosts = require(`./queries/queryPosts.js`)
//
// const getRelatedPosts = require('./getRelatedPosts.js')
const createPost = require('./createPost.js')

module.exports = async function createPages(props) {
    // Templates
    // const pageTemplate = path.resolve('src/templates/page.js')
    // const postTemplate = path.resolve('src/templates/post.js')
    //
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

    // // eslint-disable-next-line
    // console.log('Getting Pages')
    //
    // await fetcher({
    //     graphql,
    //     postType: 'Page',
    //     query: queryPages,
    // }).then(async (pages) => {
    //     if (pages) {
    //         pages.forEach((node) => {
    //             createPage({
    //                 path: `/${node.slug}/`,
    //                 component: slash(pageTemplate),
    //                 context: {
    //                     page: node,
    //                 },
    //             })
    //         })
    //     }
    // })

    // eslint-disable-next-line
    console.log('Getting Posts')

    await createPost(props, { perPage, blogURI: '/' })
}
