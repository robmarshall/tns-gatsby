import React from "react"
import get from 'lodash/get'
import SEO from "../components/SEO/SEO"
import ArticleContainer from "../containers/ArticleContainer";
import Layout from "../containers/Layout"

const PageTemplate = (props) => {

    const {
        pageContext: { page: {
            title,
            content,
            date,
            modified,
            featuredImage,
            seo,
        } },
        postURI,
    } = props

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

    return (
        <Layout>

            <SEO
                postType="page"
                yoastTitle={seo.title}
                title={title}
                description={seo.metaDesc}
                facebookPostImage={facebookImage}
                twitterPostImage={twitterImage}
                url={postURI}
                datePublished={date}
                dateModified={modified}
            />

            <ArticleContainer>

                <h1
                    // eslint-disable-next-line
                  dangerouslySetInnerHTML={{__html: title}} />
                <div
                    // eslint-disable-next-line
                  dangerouslySetInnerHTML={{__html: content}} />

            </ArticleContainer>
        </Layout>
    )

}

export default PageTemplate
