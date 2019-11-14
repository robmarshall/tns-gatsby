import React, { Component } from "react";
import moment from "moment";
import Prism from "prismjs";
import CategoryList from "../components/CategoryList";
import ImageChecker from "../components/ImageChecker";
import Layout from "../components/Layout";
import SEO from "../components/SEO/SEO";
import TagList from "../components/TagList";
import "prismjs/themes/prism-tomorrow.css";

class PostTemplate extends Component {

    componentDidMount() {
        Prism.highlightAll();
    }

    render() {

        const {
            title,
            content,
            date,
            modified,
            excerpt,
            featured_media,
            tags,
            categories,
            seo,
        } = props

        const images = featured_media
            ? featured_media.localFile.childImageSharp
            : "";

        const publishedSchema = moment(date, "YYYY-MM-DD, HH:mm:ss").format();
        const publishedUser = moment(date, "YYYY-MM-DD, HH:mm:ss").format(
            "Do MMMM YYYY"
        );

        const modifiedSchema = moment(
            modified,
            "YYYY-MM-DD, HH:mm:ss"
        ).format();
        const modifiedUser = moment(modified, "YYYY-MM-DD, HH:mm:ss").format(
            "Do MMMM YYYY"
        );

        return (
            <Layout>
                <SEO
                    title={seo.title || title}
                    description={seo.metaDesc || excerpt}
                    article
                    image={images.facebook ? images.facebook.src : ""}
                    imageAlt={featured_media ? featured_media.alt_text : ""}
                    facebookImage={images.facebook || ""}
                    twitterImage={images.twitter ? images.twitter.src : ""}
                    publishedTime={publishedSchema}
                    modifiedTime={modifiedSchema}
                    tags={tags}
                />

                <article className="post">

                    <h1
                        // eslint-disable-next-line
                      dangerouslySetInnerHTML={{ __html: title }} />

                    <time
                        className="post__date post__date--published"
                        dateTime={publishedSchema}
                    >
                        {publishedUser}
                    </time>
                    <time
                        className="post__date post__date--updated screen-reader-text"
                        dateTime={modifiedSchema}
                    >
                        {modifiedUser}
                    </time>

                    <CategoryList cats={categories} />

                    <ImageChecker
                        featuredMedia={featured_media}
                        className="post__feat-image"
                    />
                    <div
                        // eslint-disable-next-line
                      dangerouslySetInnerHTML={{ __html: content }} />

                    <TagList tags={tags} />
                </article>
            </Layout>
        );
    }
}

export default PostTemplate;
