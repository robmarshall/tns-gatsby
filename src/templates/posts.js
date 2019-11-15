import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import _ from 'lodash'
import moment from 'moment';
import ArchivePaginationLinks from "../components/ArchivePaginationLinks"

import Layout from "../components/Layout"

import '../sass/layout/post.scss';

const IndexPage = ({ data, pageContext }) => {
    const { pageCount, group, index, first, last } = pageContext;
    const previousUrl = index - 1 > 1 ? `page/${(index - 1).toString()}` : ""
    const nextUrl = (index + 1).toString();

    return (
        <Layout>

            <div className="post-list">
                {group.map(node => {

                    const image = _.get(
                        node,
                        'featuredImage.imageFile.childImageSharp.image1000',
                        false
                    )

                    const featuredAlt = _.get(node, '.featuredImagealt_text', false)
                    const featuredTitle = _.get(node, '.featuredImagetitle', false)

                    return (

                        <div key={node.slug} className="post">

                            <Link to={node.slug}>

                                <div>
                                    <Img className="post__feat-image" fluid={image} title={featuredTitle} alt={featuredAlt} />
                                </div>

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

                    )
                }

                )}

            </div>

            <ArchivePaginationLinks
                pageCount={pageCount}
                first={first}
                last={last}
                prevUrl={previousUrl}
                nextUrl={`page/${  nextUrl}`}
                prevText="Go to Previous Page"
                nextText="Go to Next Page"
            />

        </Layout>
    );
};

export default IndexPage;
