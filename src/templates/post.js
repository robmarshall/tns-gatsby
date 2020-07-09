import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import contentParser from 'gatsby-wpgraphql-inline-images'
import Prism from 'prismjs'
import CategoryList from '../components/CategoryList'
import RelatedCards from '../components/RelatedCards'
import SEO from '../components/SEO/SEO'
import TagList from '../components/TagList'
import ArticleContainer from '../containers/ArticleContainer'
import Layout from '../containers/Layout'

const PostTemplate = (props) => {
    useEffect(() => {
        Prism.highlightAll()
    }, [])

    const {
        pageContext: { relatedPosts },
        data: {
            wpgraphql: {
                post: {
                    content,
                    date,
                    cleanTitle,
                    cleanExcerpt,
                    modified,
                    modifiedForUser,
                    modifiedForSchema,
                    featuredImage,
                    tags,
                    categories,
                    seo,
                },
            },
        },
        uri,
    } = props

    const image =
        featuredImage?.node?.imageFile?.childImageSharp?.base700?.base64 ||
        false

    const facebookImage =
        featuredImage?.node?.imageFile?.childImageSharp?.facebook?.src || false

    const twitterImage =
        featuredImage?.node?.imageFile?.childImageSharp?.twitter?.src || false

    const featuredAlt = featuredImage.node?.alt_text || ''
    const featuredTitle = featuredImage?.node?.title || ''

    const pluginOptions = {
        wordPressUrl: `http://rest.thoughtsandstuff.com/`,
        uploadsUrl: `http://rest.thoughtsandstuff.com/wp-content/uploads/`,
    }

    return (
        <Layout>
            <SEO
                postType="page"
                yoastTitle={seo.title}
                title={cleanTitle}
                description={cleanExcerpt}
                facebookPostImage={facebookImage}
                twitterPostImage={twitterImage}
                url={uri}
                dateModified={modified}
            />

            <ArticleContainer>
                <article className="post">
                    <h1>{cleanTitle}</h1>

                    <div className="post__date_wrap">
                        <span className="post__date_updated">
                            Last Updated:{' '}
                        </span>
                        <time
                            className={'post__date'}
                            dateTime={modifiedForSchema}
                            itemProp="dateModified"
                        >
                            {modifiedForUser}
                        </time>
                    </div>

                    <CategoryList cats={categories.nodes} />

                    {image && (
                        <div>
                            <img
                                className="post__feat-image"
                                src={image}
                                title={featuredTitle || ''}
                                alt={featuredAlt || ''}
                            />
                        </div>
                    )}

                    <div>{contentParser({ content }, pluginOptions)}</div>

                    <TagList tags={tags.nodes} />
                </article>
            </ArticleContainer>

            <RelatedCards relatedPosts={relatedPosts} />
        </Layout>
    )
}

export default PostTemplate

export const pageQuery = graphql`
    query PostById($id: String!) {
        site {
            siteMetadata {
                siteName
            }
        }
        wpPost(id: { eq: $id }) {
            id
            slug
            title
            date
            modified
            modifiedForUser
            modifiedForSchema
            content
            uri
            excerpt
            cleanTitle
            cleanExcerpt
            seo {
                metaDesc
                title
            }
            categories {
                nodes {
                    name
                    slug
                }
            }
            tags {
                nodes {
                    name
                    slug
                }
            }
            featuredImage {
                node {
                    altText
                    title
                    databaseId
                    modified
                    localFile {
                        childImageSharp {
                            base700: sizes(base64Width: 800, quality: 100) {
                                base64
                            }
                            facebook: fixed(width: 1024, height: 512) {
                                src
                                width
                                height
                            }
                            twitter: fixed(width: 1200, height: 630) {
                                src
                            }
                        }
                    }
                }
            }
        }
    }
`
