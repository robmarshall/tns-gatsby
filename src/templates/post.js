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
        // pageContext: { relatedPosts },
        data: {
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
            relatedByCat,
            relatedTopUp,
        },
        uri,
    } = props

    const image =
        featuredImage?.node?.remoteFile?.childImageSharp?.fluid || false

    const facebookImage =
        featuredImage?.node?.remoteFile?.childImageSharp?.facebook?.src || false

    const twitterImage =
        featuredImage?.node?.remoteFile?.childImageSharp?.twitter?.src || false

    const featuredAlt = featuredImage.node?.alt_text || ''
    const featuredTitle = featuredImage?.node?.title || ''

    const relatedPosts = relatedByCat.nodes
    const relatedCount = relatedPosts.length
    if (relatedCount < 3) {
        const relatedNeeded = 3 - relatedCount

        for (var i = 0; i < relatedNeeded; i++) {
            const newRelated = relatedTopUp.nodes[i]
            relatedPosts.push(newRelated)
        }
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
            <RelatedCards relatedPosts={relatedPosts} />
        </Layout>
    )
}

export const postQuery = graphql`
    query post($id: String!, $primaryCatId: Int!) {
        wpPost(id: { eq: $id }) {
            ...PostContent
            modifiedForUser: modifed(formatString: "D MMMM YYYY")
            modifiedForSchema: modifed(formatString: "YYYY-MM-DD, HH:mm:ss")
        }
        relatedByCat: allWpPost(
            limit: 3
            filter: {
                categories: {
                    nodes: { elemMatch: { databaseId: { eq: $primaryCatId } } }
                }
            }
        ) {
            nodes {
                ...RelatedContent
            }
        }
        relatedTopUp: allWpPost(limit: 3) {
            nodes {
                ...RelatedContent
            }
        }
    }
`

export default PostTemplate
