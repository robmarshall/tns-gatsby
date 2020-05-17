import React from 'react'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'
import ArticleContainer from '../containers/ArticleContainer'
import Layout from '../containers/Layout'

import '../sass/layout/post.scss'

const IndexPage = ({ data, pageContext }) => {
    const { pageCount, group, index } = pageContext

    return (
        <Layout>
            <ArticleContainer>
                <div className="post-list">
                    {group.map((node) => (
                        <ArticleCard key={node.slug} node={node} />
                    ))}
                </div>

                <Pagination
                    prefix=""
                    currentPage={index}
                    numPages={pageCount}
                />
            </ArticleContainer>
        </Layout>
    )
}

export default IndexPage
