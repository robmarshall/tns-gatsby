import React from "react";
import ArticleCard from "../components/ArticleCard";
import ArticleContainer from "../containers/ArticleContainer";
import Layout from "../containers/Layout";
import Pagination from "../components/Pagination";
import SEO from "../components/SEO/SEO";

const IndexPage = ({ data, pageContext }) => {
  const { group, index, pageCount, additionalContext } = pageContext;

  const { catName, catSlug } = additionalContext;
  const catDesc =
    additionalContext.catDescription || `${catName} category archive page`;

  return (
    <Layout>
      <SEO title={catName} description={catDesc} />

          <ArticleContainer>

              <h1>
                Category:
                {catName}
              </h1>

              <div className="post-list">
                {group.map(node => (
                  <ArticleCard key={node.slug} node={node} />
                ))}
              </div>

              <Pagination
                prefix={`categories/${catSlug}`}
                currentPage={index}
                numPages={pageCount}
              />

        </ArticleContainer>

    </Layout>
  );
};

export default IndexPage;
