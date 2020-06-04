import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import contentParser from 'gatsby-wpgraphql-inline-images'
import Prism from 'prismjs'
import CategoryList from '../components/CategoryList'
import RelatedCards from '../components/RelatedCards'
import SEO from '../components/SEO/SEO'
import TagList from '../components/TagList'
import ArticleContainer from '../containers/ArticleContainer'
import Layout from '../containers/Layout'
import decodeEntities from '../utils/decodeEntities'

const PostTemplate = (props) => {
    useEffect(() => {
        Prism.highlightAll()
    }, [])

    const {
        pageContext: {
            post: {
                title,
                content,
                date,
                modified,
                excerpt,
                featuredImage,
                tags,
                categories,
                seo,
            },
            relatedPosts,
        },
        uri,
    } = props

    const image =
        featuredImage?.imageFile?.childImageSharp?.base700?.base64 || false

    const facebookImage =
        featuredImage?.imageFile?.childImageSharp?.facebook?.src || false

    const twitterImage =
        featuredImage?.imageFile?.childImageSharp?.twitter?.src || false

    const featuredAlt = featuredImage?.alt_text || ''
    const featuredTitle = featuredImage?.title || ''

    const publishedSchema = dayjs(date, 'YYYY-MM-DD, HH:mm:ss').format()
    const publishedUser = dayjs(date, 'YYYY-MM-DD, HH:mm:ss').format(
        'D MMMM YYYY'
    )

    const modifiedSchema = dayjs(modified, 'YYYY-MM-DD, HH:mm:ss').format()
    const modifiedUser = dayjs(modified, 'YYYY-MM-DD, HH:mm:ss').format(
        'D MMMM YYYY'
    )

    const pluginOptions = {
        wordPressUrl: `http://rest.thoughtsandstuff.com/`,
        uploadsUrl: `http://rest.thoughtsandstuff.com/wp-content/uploads/`,
    }

    return (
        <Layout>
            <SEO
                postType="page"
                yoastTitle={seo.title}
                title={title}
                description={seo.metaDesc || excerpt}
                facebookPostImage={facebookImage}
                twitterPostImage={twitterImage}
                url={uri}
                datePublished={date}
                dateModified={modified}
            />

            <ArticleContainer>
                <article className="post">
                    <h1>{decodeEntities(title)}</h1>

                    <time
                        className="post__date post__date--published"
                        dateTime={publishedSchema}
                    >
                        {publishedUser}
                    </time>
                    <time
                        className="post__date post__date--updated"
                        dateTime={modifiedSchema}
                    >
                        {modifiedUser}
                    </time>

                    <CategoryList cats={categories.nodes} />

                    <div>
                        <img
                            className="post__feat-image"
                            src={image}
                            title={featuredTitle || ''}
                            alt={featuredAlt || ''}
                        />
                    </div>

                    <div>{contentParser({ content }, pluginOptions)}</div>

                    <TagList tags={tags.nodes} />
                </article>
            </ArticleContainer>

            <RelatedCards relatedPosts={relatedPosts} />
        </Layout>
    )
}

export default PostTemplate
