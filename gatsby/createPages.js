const path = require(`path`)
const slash = require(`slash`)
const createPaginatedPages = require('gatsby-paginate')

const queryPages = require(`./queries/queryPages.js`)
const queryPosts = require(`./queries/queryPosts.js`)

const slugify = require('../utils/slugify')
const fetcher = require(`./fetcher.js`)
const getRelatedPosts = require('./getRelatedPosts.js')

module.exports = async function createPages({ graphql, actions }) {
    // Templates
    const pageTemplate = path.resolve('src/templates/page.js')
    const postTemplate = path.resolve('src/templates/post.js')
    const postsTemplate = path.resolve('src/templates/posts.js')
    const tagTemplate = path.resolve('src/templates/tags.js')
    const categoryTemplate = path.resolve('src/templates/categories.js')

    const { createPage } = actions

    // eslint-disable-next-line
    console.log('Getting Pages')

    await fetcher({
        graphql,
        postType: 'pages',
        query: queryPages,
    }).then(async (pages) => {
        if (pages) {
            pages.forEach((node) => {
                createPage({
                    path: `/${node.slug}/`,
                    component: slash(pageTemplate),
                    context: {
                        page: node,
                    },
                })
            })
        }
    })

    // eslint-disable-next-line
    console.log('Getting Posts')

    await fetcher({
        graphql,
        postType: 'posts',
        query: queryPosts,
    }).then(async (posts) => {
        if (posts) {
            // Posts detail
            const tags = []
            const categories = []

            // Strip down post data into essential object
            const slimPosts = posts.map((node) => ({
                id: node.id,
                image:
                    node.featuredImage?.imageFile?.childImageSharp?.image700 ||
                    false,
                imageSmall:
                    node.featuredImage?.imageFile?.childImageSharp?.image500 ||
                    false,
                imageAlt: node.featuredImage?.altText || '',
                imageTitle: node.featuredImage?.title || '',
                title: node.cleanTitle,
                slug: node.slug,
                modifiedForUser: node.modifiedForUser,
                modifiedForSchema: node.modifiedForSchema,
                excerpt: node.cleanExcerpt,
                cats: node?.categories?.nodes || [],
                tags: node?.tags?.nodes || [],
            }))

            createPaginatedPages({
                edges: slimPosts,
                createPage,
                pageTemplate: postsTemplate,
                pathPrefix: '',
                buildPath: (index, pathPrefix) =>
                    index > 1
                        ? `${pathPrefix}/page/${index}`
                        : `/${pathPrefix}`,
            })

            slimPosts.forEach((node) => {
                // Grab all the tags and categories for later use
                if (node.tags) {
                    node.tags.forEach((tag) => {
                        tags.push(tag.name)
                    })
                }

                if (node.cats) {
                    node.cats.forEach((category) => {
                        categories.push(category.name)
                    })
                }

                const relatedPosts = getRelatedPosts({
                    posts: slimPosts,
                    current: node,
                    sortBy: 'cats',
                })

                createPage({
                    path: `/${node.slug}/`,
                    component: slash(postTemplate),
                    context: {
                        id: node.id,
                        relatedPosts: relatedPosts,
                    },
                })
            })

            const tagSet = new Set()
            const tagMap = new Map()
            const categorySet = new Set()
            const categoryMap = new Map()

            // Now loop through posts, and allocated posts to tags/cats
            slimPosts.forEach((node) => {
                if (node.tags) {
                    node.tags.forEach((tag) => {
                        tagSet.add(tag)
                        const array = tagMap.has(tag.name)
                            ? tagMap.get(tag.name)
                            : []
                        array.push(node)
                        tagMap.set(tag.name, array)
                    })
                }

                if (node.cats) {
                    node.cats.forEach((category) => {
                        categorySet.add(category)
                        const array = categoryMap.has(category.name)
                            ? categoryMap.get(category.name)
                            : []
                        array.push(node)
                        categoryMap.set(category.name, array)
                    })
                }
            })

            // Create paginated tag/cat pages
            const tagList = Array.from(tagSet)
            const categoryList = Array.from(categorySet)

            tagList.forEach((tag) => {
                createPaginatedPages({
                    edges: tagMap.get(tag.name),
                    createPage,
                    pageTemplate: tagTemplate,
                    pathPrefix: 'tag',
                    buildPath: (index, pathPrefix) =>
                        index > 1
                            ? `${pathPrefix}/${slugify(tag.name)}/page/${index}`
                            : `/${pathPrefix}/${slugify(tag.name)}`,
                    context: {
                        tagName: tag.name,
                        tagSlug: slugify(tag.name),
                        tagDescription: tag.description,
                    },
                })
            })

            categoryList.forEach((category) => {
                createPaginatedPages({
                    edges: categoryMap.get(category.name),
                    createPage,
                    pageTemplate: categoryTemplate,
                    pathPrefix: 'category',
                    buildPath: (index, pathPrefix) =>
                        index > 1
                            ? `${pathPrefix}/${slugify(
                                  category.name
                              )}/page/${index}`
                            : `/${pathPrefix}/${slugify(category.name)}`,
                    context: {
                        catName: category.name,
                        catSlug: slugify(category.name),
                        catDescription: category.description,
                    },
                })
            })
        }
    })
}
