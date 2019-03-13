import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO/SEO"
import ImageChecker from "../components/ImageChecker"
import CategoryList from "../components/CategoryList";
import TagList from "../components/TagList";

class PostTemplate extends Component {
    render() {

        const post = this.props.data.wordpressPost;
        const images = post.featured_media.localFile.childImageSharp;

        return (
            <Layout>

                <SEO
                    title = {post.title}
                    description = { (post.yoast_meta.yoast_wpseo_metadesc || post.excerpt) }
                    article = {true}
                    image = { ( images.facebook.src || '' ) }
                    imageAlt = { post.featured_media.alt_text }
                    facebookImage = { ( images.facebook || '' ) }
                    twitterImage = { ( images.twitter.src || '' ) }
                    publishedTime = { post.date }
                    modifiedTime = { post.modified }
                    tags={post.tags}
                />

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
            excerpt
            slug
            date
            modified
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
                yoast_wpseo_title
                yoast_wpseo_metadesc
                yoast_wpseo_meta_robots_noindex
                yoast_wpseo_meta_robots_nofollow
                yoast_wpseo_canonical
                yoast_wpseo_opengraph_title
                yoast_wpseo_opengraph_description
                yoast_wpseo_opengraph_image
                yoast_wpseo_twitter_title
                yoast_wpseo_twitter_description
                yoast_wpseo_twitter_image
            }
        }
    }
`
