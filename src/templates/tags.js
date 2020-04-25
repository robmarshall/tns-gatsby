import React from 'react'
import ArticleCard from '../components/ArticleCard'
import ArticleContainer from '../containers/ArticleContainer'
import Layout from '../containers/Layout'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO/SEO'

const IndexPage = ({ data, pageContext }) => {
    const { group, index, pageCount, additionalContext } = pageContext

    const { tagName, tagSlug } = additionalContext
    const tagDesc =
        additionalContext.tagDescription || `${tagName} tag archive page`

    return (
        <Layout>
            <SEO title={tagName} description={tagDesc} />

            <ArticleContainer>
                <h1>
                    Tag:
                    {tagName}
                </h1>

                <div className="post-list">
                    {group.map((node) => (
                        <ArticleCard key={node.slug} node={node} />
                    ))}
                </div>

                <Pagination
                    prefix={`tag/${tagSlug}`}
                    currentPage={index}
                    numPages={pageCount}
                />
            </ArticleContainer>
        </Layout>
    )
}

export default IndexPage
