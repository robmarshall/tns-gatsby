import React, { Component } from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import ImageChecker from "../components/ImageChecker"
import CategoryList from "../components/CategoryList";
import TagList from "../components/TagList";

class PostTemplate extends Component {
    render() {
        const post = this.props.data.wordpressPost;

        return (
            <Layout>
                <Seo yoast={post.yoast_meta} />
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
            siteMetadata {
                title
                subtitle
            }
        }
    }
`
