import React, { Component } from "react";
import Img from "gatsby-image";
import _ from 'lodash'
import moment from "moment";
import Prism from "prismjs";
import CategoryList from "../components/CategoryList";
import Layout from "../components/Layout";
import SEO from "../components/SEO/SEO";
import TagList from "../components/TagList";
import "prismjs/themes/prism-tomorrow.css";
import RelatedCard from '../components/RelatedCard'

class PostTemplate extends Component {

    componentDidMount() {
        Prism.highlightAll();
    }

    render() {

        const {
            pageContext: { post: {
                title,
                content,
                date,
                modified,
                excerpt,
                featuredImage,
                tags,
                categories,
                seo,
            }, relatedPosts },
            postURI,
        } = this.props

        const image = _.get(
            featuredImage,
            'imageFile.childImageSharp.image1000',
            false
        )

        const facebookImage = _.get(
            featuredImage,
            'imageFile.childImageSharp.facebook.src',
            false
        )
        const twitterImage = _.get(
            featuredImage,
            'imageFile.childImageSharp.twitter.src',
            false
        )

        const featuredAlt = _.get(featuredImage, 'alt_text', false)
        const featuredTitle = _.get(featuredImage, 'title', false)

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
                    postType="page"
                    yoastTitle={seo.title}
                    title={title}
                    description={seo.metaDesc || excerpt}
                    facebookPostImage={facebookImage}
                    twitterPostImage={twitterImage}
                    url={postURI}
                    datePublished={date}
                    dateModified={modified}
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
                        className="post__date post__date--updated"
                        dateTime={modifiedSchema}
                    >
                        {modifiedUser}
                    </time>

                    <CategoryList cats={categories.nodes} />

                    <div>
                        <Img className="post__feat-image" fluid={image} title={featuredTitle} alt={featuredAlt} />
                    </div>

                    <div
                        // eslint-disable-next-line
                      dangerouslySetInnerHTML={{ __html: content }} />

                    <TagList tags={tags.nodes} />


                    {
                        relatedPosts.length > 0 && (
                            <div className="post_related">
                                <h2 className="post_related_title">Related Posts</h2>
                                <div className="post_related_wrap">
                                    {
                                        relatedPosts.map(post => {

                                            return (
                                                <RelatedCard node={post} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }

                </article>
            </Layout>
        );
    }
}

export default PostTemplate;
