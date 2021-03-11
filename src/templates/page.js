import React from 'react'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import SEO from '../components/SEO/SEO'
import ArticleContainer from '../containers/ArticleContainer'
import Layout from '../containers/Layout'

const PageTemplate = (props) => {
    const {
        data: {
            wpPost: { content, date, cleanTitle, modified, featuredImage, seo },
        },
        uri,
    } = props

    const facebookImage = getSrc(featuredImage?.node?.facebook)

    const twitterImage = getSrc(featuredImage?.node?.twitter)

    return (
        <Layout>
            <SEO
                postType="page"
                yoastTitle={seo.title}
                title={cleanTitle}
                description={seo.metaDesc}
                facebookPostImage={facebookImage}
                twitterPostImage={twitterImage}
                url={uri}
                datePublished={date}
                dateModified={modified}
            />

            <ArticleContainer>
                <h1
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: cleanTitle }}
                />
                <div
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </ArticleContainer>
        </Layout>
    )
}

export const pageQuery = graphql`
    query page($id: Int!) {
        wpPage(databaseId: { eq: $id }) {
            ...PageContent
        }
    }
`

export default PageTemplate
