import React, { Component } from "react";
import moment from "moment";
import Layout from "../components/Layout";
import SEO from "../components/SEO/SEO";
import ImageChecker from "../components/ImageChecker";
import CategoryList from "../components/CategoryList";
import TagList from "../components/TagList";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

class PostTemplate extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const post = this.props.data.wordpressPost;
    const images = post.featured_media
      ? post.featured_media.localFile.childImageSharp
      : "";

    return (
      <Layout>
        <SEO
          title={post.title}
          description={post.yoast_meta.yoast_wpseo_metadesc || post.excerpt}
          article={true}
          image={images.facebook ? images.facebook.src : ""}
          imageAlt={post.featured_media ? post.featured_media.alt_text : ""}
          facebookImage={images.facebook || ""}
          twitterImage={images.twitter ? images.twitter.src : ""}
          publishedTime={post.date}
          modifiedTime={post.modified}
          tags={post.tags}
        />

        <article className="post">
          <h1 dangerouslySetInnerHTML={{ __html: post.title }} />

          <time
            className="post__date post__date--published"
            dateTime={moment(post.date).format("YYYY-MM-DDTHH:mm:ss+00:00")}
          >
            {moment(post.date).format("Do MMMM YYYY")}
          </time>
          <time
            className="post__date post__date--updated screen-reader-text"
            dateTime={moment(post.modifed).format("YYYY-MM-DDTHH:mm:ss+00:00")}
          >
            {moment(post.modifed).format("Do MMMM YYYY")}
          </time>

          <CategoryList cats={post.categories} />

          <ImageChecker
            featuredMedia={post.featured_media}
            className="post__feat-image"
          />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          <TagList tags={post.tags} />
        </article>
      </Layout>
    );
  }
}

export default PostTemplate;

export const postQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      excerpt
      slug
      date(formatString: "YYYY-MM-DD, HH:mm:ss")
      modified(formatString: "YYYY-MM-DD, HH:mm:ss")
      tags {
        name
      }
      categories {
        name
      }
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 700) {
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
`;
