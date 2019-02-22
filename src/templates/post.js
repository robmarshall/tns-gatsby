import React, { Component } from "react"
import Layout from "../components/Layout"
import ImageChecker from "../components/ImageChecker"
import CategoryList from "../components/CategoryList";
import TagList from "../components/TagList";

class PostTemplate extends Component {
    render() {
        const post = this.props.data.wordpressPost;

        return (
            <Layout>
                <p dangerouslySetInnerHTML={{ __html: post.date }} />
                <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
                <ImageChecker featuredMedia={post.featured_media}/>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <CategoryList cats={post.categories}/>
                <TagList tags={post.tags}/>
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
            tags {
              slug
              name
            }
            categories {
              slug
              name
            }
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
