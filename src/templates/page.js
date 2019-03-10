import React, {Component} from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"

class PageTemplate extends Component {
    render() {

        const siteMetadata = this.props.data.site.siteMetadata
        const currentPage = this.props.data.wordpressPage

        return (
            <Layout>
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
            slug
            date(formatString: "DD, MM YYYY")
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
                subtitle
            }
        }
    }
`
