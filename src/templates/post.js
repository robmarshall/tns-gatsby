import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
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
        data: {
            relatedPosts,
            wpPost: {
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
        uri,
    } = props

    const image =
        featuredImage?.node?.localFile?.childImageSharp?.fluid || false

    const facebookImage =
        featuredImage?.node?.localFile?.childImageSharp?.facebook?.src || false

    const twitterImage =
        featuredImage?.node?.localFile?.childImageSharp?.twitter?.src || false

    const featuredAlt = featuredImage.node?.altText || ''
    const featuredTitle = featuredImage?.node?.title || ''

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
                            <Img
                                className="post__feat-image"
                                fluid={image}
                                loading="eager"
                                title={featuredTitle || ''}
                                alt={featuredAlt || ''}
                            />
                        </div>
                    )}

                    <div dangerouslySetInnerHTML={{ __html: content }} />

                    <TagList tags={tags.nodes} />
                </article>
            </ArticleContainer>
            <RelatedCards relatedPosts={relatedPosts.nodes} />
        </Layout>
    )
}

export const postQuery = graphql`
    query post($id: Int!, $related: [Int!]) {
        wpPost(databaseId: { eq: $id }) {
            ...PostContent
            modifiedForUser: modified(formatString: "D MMMM YYYY")
            modifiedForSchema: modified(formatString: "YYYY-MM-DD, HH:mm:ss")
        }
        relatedPosts: allWpPost(filter: { databaseId: { in: $related } }) {
            nodes {
                ...RelatedContent
            }
        }
    }
`

export default PostTemplate
