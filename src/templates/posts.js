import React from "react";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";

import "../sass/layout/post.scss";

const IndexPage = ({ data, pageContext }) => {
  const { pageCount, group, index } = pageContext;

  return (
    <Layout>
      <div className="post-list">
        {group.map(node => (
          <ArticleCard key={node.slug} node={node} />
        ))}
      </div>

      <Pagination prefix="" currentPage={index} numPages={pageCount} />
    </Layout>
  );
};

export default IndexPage;
