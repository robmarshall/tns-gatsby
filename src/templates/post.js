import React, { Component } from "react"
import Layout from "../components/Layout"
import ImageChecker from "../components/ImageChecker"

class PostTemplate extends Component {
    render() {
        const post = this.props.data.wordpressPost

        return (
            <Layout>
                <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
                <ImageChecker featuredMedia={post.featured_media}/>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <p dangerouslySetInnerHTML={{ __html: post.date }} />
                <p dangerouslySetInnerHTML={{ __html: post.slug }} />
            </Layout>
        )
    }
}

export default PostTemplate

export const postQuery = graphql`
    query currentPostQuery($id: String!) {
        wordpressPost(id: { eq: $id }) {
            title
            content
            slug
            date(formatString: "DD, MM YYYY")
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
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                subtitle
            }
        }
    }
`
