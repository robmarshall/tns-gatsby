import React, { useEffect } from 'react'
import Img from 'gatsby-image'
import contentParser from 'gatsby-wpgraphql-inline-images'
import get from 'lodash/get'
import dayjs from 'dayjs'
import Prism from 'prismjs'
import CategoryList from '../components/CategoryList'
import ArticleContainer from '../containers/ArticleContainer'
import Container from '../containers/Container'
import Layout from '../containers/Layout'
import RelatedCards from '../components/RelatedCards'
import SEO from '../components/SEO/SEO'
import TagList from '../components/TagList'
import slugify from '../utils/slugify'

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

    const image = get(
        featuredImage,
        'imageFile.childImageSharp.image1000',
        false
    )

    const facebookImage = get(
        featuredImage,
        'imageFile.childImageSharp.facebook.src',
        false
    )
    const twitterImage = get(
        featuredImage,
        'imageFile.childImageSharp.twitter.src',
        false
    )

    const featuredAlt = get(featuredImage, 'alt_text', false)
    const featuredTitle = get(featuredImage, 'title', false)

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
                    <h1>{title}</h1>

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
                        <Img
                            className="post__feat-image"
                            fluid={image}
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
