import React from "react"
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
            seo,
        } },
        postURI,
    } = props

    return (
        <Layout>

            <SEO
                title={seo.title || title}
                description={seo.metaDesc || excerpt}
                publishedTime={date}
                modifiedTime={modified}
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
