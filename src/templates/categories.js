import React from "react";
import { Link } from "gatsby";
import _ from "lodash";
import moment from 'moment';
import ArchivePaginationLinks from "../components/ArchivePaginationLinks"
import ImageChecker from "../components/ImageChecker"
import Layout from "../components/Layout"
import SEO from "../components/SEO/SEO"

const IndexPage = ({ data, pageContext }) => {
    const { group, index, first, last, pageCount, additionalContext, pathPrefix } = pageContext;
    const previousUrl = index - 1 > 1 ? `page/${(index - 1).toString()}` : ""
    const nextUrl = (index + 1).toString();

    const {catName} = additionalContext;
    const catDesc = additionalContext.catDescription || `${catName  } category archive page`;

    return (
        <Layout>

            <SEO
                title={catName}
                description={catDesc}
            />

            <h1>
Category:
                {catName}
            </h1>

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
                                // eslint-disable-next-line
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
                                // eslint-disable-next-line
                                dangerouslySetInnerHTML={{__html: node.excerpt}}
                            />

                        </Link>

                    </div>

                ))}

            </div>

            <ArchivePaginationLinks
                pageCount={pageCount}
                first={first}
                last={last}
                prevUrl={`${pathPrefix}/${_.kebabCase(catName)}/${previousUrl}`}
                nextUrl={`${pathPrefix}/${_.kebabCase(catName)}/page/${nextUrl}`}
                prevText="Go to Previous Page"
                nextText="Go to Next Page"
            />

        </Layout>
    );
};

export default IndexPage;
