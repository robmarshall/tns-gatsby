import React from "react"
import _ from 'lodash'
import Layout from "../components/Layout"
import SEO from "../components/SEO/SEO"

const PageTemplate = (props) => {

    const {
        pageContext: { page: {
            title,
            content,
            date,
            modified,
            excerpt,
            featuredImage,
            seo,
        } },
        postURI,
    } = props

    const facebookImage = _.get(
        featuredImage,
        'imageFile.childImageSharp.facebook.src',
        false
    )
    const twitterImage = _.get(
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
                description={seo.metaDesc || excerpt}
                facebookPostImage={facebookImage}
                twitterPostImage={twitterImage}
                url={postURI}
                datePublished={date}
                dateModified={modified}
            />

            <h1
                // eslint-disable-next-line
              dangerouslySetInnerHTML={{__html: title}} />
            <div
                // eslint-disable-next-line
              dangerouslySetInnerHTML={{__html: content}} />
        </Layout>
    )

}

export default PageTemplate
