const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const queryAll = require(`./src/queries/queryAll.js`)
const createPaginatedPages = require("gatsby-paginate")

exports.createPages = ({ graphql, boundActionCreators }) => {

    const { createPage } = boundActionCreators;

    return new Promise((resolve, reject) => {

        // Templates
        const pageTemplate = path.resolve("./src/templates/page.js");
        const postTemplate = path.resolve("./src/templates/post.js");
        const postsTemplate = path.resolve("./src/templates/posts.js");
        const tagTemplate = path.resolve('./src/templates/tags.js');
        const categoryTemplate = path.resolve('./src/templates/categories.js');

        resolve(
            graphql(queryAll).then(result => {
                if (result.errors) reject(result.errors)

                // Pages detail
                const pages = result.data.allWordpressPage.edges

                pages.forEach(edge => {
                    createPage({
                        path: `/${edge.node.slug}/`,
                        component: slash(pageTemplate),
                        context: {
                            id: edge.node.id,
                        },
                    })
                })

                // Posts detail
                const posts = result.data.allWordpressPost.edges;
                let tags = [];
                let categories = [];

                createPaginatedPages({
                    edges: posts,
                    createPage: createPage,
                    pageTemplate: postsTemplate,
                    pageLength: 8,
                    pathPrefix: "",
                    buildPath: (index, pathPrefix) =>
                        index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
                })

                posts.forEach(edge => {

                    // Grab all the tags and categories for later use
                    if(edge.node.tags){
                        edge.node.tags.forEach(tag => {
                            tags.push(tag.name)
                        });
                    }

                    if(edge.node.categories){
                        edge.node.categories.forEach(category => {
                            categories.push(category.name)
                        });
                    }

                    createPage({
                        path: `/${edge.node.slug}/`,
                        component: slash(postTemplate),
                        context: {
                            id: edge.node.id,
                            slug: edge.node.slug
                        },
                    });

                });

                const tagSet = new Set()
                const tagMap = new Map()
                const categorySet = new Set()
                const categoryMap = new Map()


                // Now loop through posts, and allocated posts to tags/cats
                posts.forEach(post => {

                    if(post.node.tags){

                        post.node.tags.forEach(tag => {
                            tagSet.add(tag.name)
                            const array = tagMap.has(tag.name) ? tagMap.get(tag.name) : []
                            array.push(post)
                            tagMap.set(tag.name, array)
                        })

                    }

                    if(post.node.categories){

                        post.node.categories.forEach(category => {
                            categorySet.add(category.name)
                            const array = categoryMap.has(category.name)
                            ? categoryMap.get(category.name)
                            : []
                            array.push(post)
                            categoryMap.set(category.name, array)
                        })

                    }

                });

                // Create paginated tag/cat pages
                const tagList = Array.from(tagSet)
                const categoryList = Array.from(categorySet)

                tagList.forEach(tag => {
                    createPaginatedPages({
                        edges: tagMap.get(tag),
                        createPage: createPage,
                        pageTemplate: tagTemplate,
                        pageLength: 8,
                        pathPrefix: "tag",
                        buildPath: (index, pathPrefix) =>
                            index > 1 ? `${pathPrefix}/${_.kebabCase(tag)}/page/${index}` : `/${pathPrefix}/${_.kebabCase(tag)}`,
                        context: {
                            tag: tag
                        },
                    })
                });

                categoryList.forEach(category => {
                    createPaginatedPages({
                        edges: categoryMap.get(category),
                        createPage: createPage,
                        pageTemplate: categoryTemplate,
                        pageLength: 8,
                        pathPrefix: "category",
                        buildPath: (index, pathPrefix) =>
                            index > 1 ? `${pathPrefix}/${_.kebabCase(category)}/page/${index}` : `/${pathPrefix}/${_.kebabCase(category)}`,
                        context: {
                            category: category
                        },
                    })
                });


            })
        )
    });
};
