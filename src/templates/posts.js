import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import _ from 'lodash'
import moment from 'moment';
import Layout from "../components/Layout"
import Pagination from "../components/Pagination"


import '../sass/layout/post.scss';

const IndexPage = ({ data, pageContext }) => {
    const { pageCount, group, index  } = pageContext;

    return (
        <Layout>

            <div className="post-list">
                {group.map(node => {

                    const image = _.get(
                        node,
                        'featuredImage.imageFile.childImageSharp.image1000',
                        false
                    )

                    const featuredAlt = _.get(node, 'featuredImage.altText', false)
                    const featuredTitle = _.get(node, 'featuredImage.title', false)

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
                                    className="post__date post__date--updated"
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

            <Pagination
                prefix=""
                currentPage={index}
                numPages={pageCount}
            />

        </Layout>
    );
};

export default IndexPage;
