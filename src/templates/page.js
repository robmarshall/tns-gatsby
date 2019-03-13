import React, {Component} from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"

class PageTemplate extends Component {
    render() {

        const siteMetadata = this.props.data.site.siteMetadata
        const currentPage = this.props.data.wordpressPage
        const images = currentPage.featured_media.localFile.childImageSharp;

        return (
            <Layout>

                <Seo
                    title = {currentPage.title}
                    description = { (currentPage.yoast_meta.yoast_wpseo_metadesc || currentPage.excerpt) }
                    image = { ( images.facebook.src || '' ) }
                    imageAlt = { currentPage.featured_media.alt_text }
                    facebookImage = { ( images.facebook || '' ) }
                    twitterImage = { ( images.twitter.src || '' ) }
                    publishedTime = { currentPage.date }
                    modifiedTime = { currentPage.modified }
                />

                <h1 dangerouslySetInnerHTML={{__html: currentPage.title}}/>
                <div dangerouslySetInnerHTML={{__html: currentPage.content}}/>
            </Layout>
        )
    }
}

export default PageTemplate

export const pageQuery = graphql`
    query currentPageQuery($id: String!) {
        wordpressPage(id: { eq: $id }) {
            title
            content
            excerpt
            slug
            date
            modified
            featured_media {
                localFile {
                    childImageSharp {
                        fluid(maxWidth: 1000) {
                            base64
                            aspectRatio
                            src
                            srcSet
                            sizes
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
                title
                alt_text
            }
            yoast_meta {
                yoast_wpseo_focuskw
                yoast_wpseo_title
                yoast_wpseo_metadesc
                yoast_wpseo_linkdex
                yoast_wpseo_metakeywords
                yoast_wpseo_meta_robots_noindex
                yoast_wpseo_meta_robots_nofollow
                yoast_wpseo_meta_robots_adv
                yoast_wpseo_canonical
                yoast_wpseo_redirect
                yoast_wpseo_opengraph_title
                yoast_wpseo_opengraph_description
                yoast_wpseo_opengraph_image
                yoast_wpseo_twitter_title
                yoast_wpseo_twitter_description
                yoast_wpseo_twitter_image
            }
        }
        site {
            id
            siteMetadata {
                title
            }
        }
    }
`
