import React from "react";
import ArticleCard from '../components/ArticleCard'
import Layout from "../components/Layout"
import Pagination from "../components/Pagination"
import SEO from "../components/SEO/SEO"

const IndexPage = ({ data, pageContext }) => {
    const { group, index, pageCount, additionalContext } = pageContext;

    const {tagName, tagSlug} = additionalContext;
    const tagDesc = additionalContext.tagDescription || `${tagName} tag archive page`;

    return (
        <Layout>

            <SEO
                title={tagName}
                description={tagDesc}
            />

            <h1>
Tag:
                {tagName}
            </h1>

            <div className="post-list">

                {group.map(node => (
                    <ArticleCard node={node} />
                ))}

            </div>

            <Pagination
                prefix={`tag/${tagSlug}`}
                currentPage={index}
                numPages={pageCount}
            />

        </Layout>
    );
};

export default IndexPage;
