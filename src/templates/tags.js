import React from "react";
import _ from "lodash";
import moment from 'moment';
import { Link } from "gatsby";
import ArchivePaginationLinks from "../components/ArchivePaginationLinks"
import Layout from "../components/Layout"
import ImageChecker from "../components/ImageChecker"
import SEO from "../components/SEO/SEO"

const IndexPage = ({ data, pageContext }) => {
    const { group, index, first, last, pageCount, additionalContext, pathPrefix } = pageContext;
    const previousUrl = index - 1 === 1 ? "" :
        index - 1 > 1 ?
        "page/" + (index - 1).toString() :
        (index - 1).toString();
    const nextUrl = (index + 1).toString();

    const tagName = additionalContext.tagName;
    const tagDesc = additionalContext.tagDescription || tagName + ' tag archive page';

    return (
        <Layout>

            <SEO
                title = {tagName}
                description = {tagDesc}
            />

            <h1>Tag: {tagName}</h1>

            <div className="post-list">

                {group.map(({ node }) => (
                    <div key={node.slug} className="post">

                        <Link to={node.slug}>

                            <ImageChecker
                                featuredMedia={node.featured_media}
                                className="post__feat-image"
                            />

                            <h3
                                className="post__title"
                                dangerouslySetInnerHTML={{__html: node.title}}
                            />

                            <time
                                className="post__date post__date--published"
                                dateTime={moment(node.date).format('YYYY-MM-DDTHH:mm:ss+00:00')}
                            >
                                {moment(node.date).format('Do MMMM YYYY')}
                            </time>
                            <time
                                className="post__date post__date--updated screen-reader-text"
                                dateTime={moment(node.modifed).format('YYYY-MM-DDTHH:mm:ss+00:00')}
                            >
                                {moment(node.modifed).format('Do MMMM YYYY')}
                            </time>

                            <div
                                className="post-content"
                                dangerouslySetInnerHTML={{__html: node.excerpt}}
                            />

                        </Link>

                    </div>
                ))}

            </div>

            <ArchivePaginationLinks
                pageCount = {pageCount}
                first = {first}
                last = {last}
                prevUrl = {`${pathPrefix}/${_.kebabCase(tagName)}/${previousUrl}`}
                nextUrl = {`${pathPrefix}/${_.kebabCase(tagName)}/page/${nextUrl}`}
                prevText = "Go to Previous Page"
                nextText = "Go to Next Page"
            />

        </Layout>
    );
};

export default IndexPage;
