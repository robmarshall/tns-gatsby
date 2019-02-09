import React, {Component} from "react"
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
