import React from "react";
import ArticleCard from '../components/ArticleCard'
import Layout from "../components/Layout"
import Pagination from "../components/Pagination"
import SEO from "../components/SEO/SEO"

const IndexPage = ({ data, pageContext }) => {
    const { group, index, pageCount, additionalContext } = pageContext;

    const {catName, catSlug} = additionalContext;
    const catDesc = additionalContext.catDescription || `${catName} category archive page`;

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

                {group.map(node => (
                    <ArticleCard node={node} />
                ))}

            </div>

            <Pagination
                prefix={`categories/${catSlug}`}
                currentPage={index}
                numPages={pageCount}
            />

        </Layout>
    );
};

export default IndexPage;
