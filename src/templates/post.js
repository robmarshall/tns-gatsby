import React, { Component } from "react"
import Layout from "../components/Layout"
import Img from "gatsby-image"

class PostTemplate extends Component {
    render() {
        const post = this.props.data.wordpressPost
        const resolutions = post.featured_media ? post.featured_media.localFile.childImageSharp.resolutions : null

        return (
            <Layout>
                <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
                {resolutions &&
                <div>
                    <Img resolutions={resolutions}/>
                </div>
                }
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
                        resolutions {
                            src
                            width
                            height
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
