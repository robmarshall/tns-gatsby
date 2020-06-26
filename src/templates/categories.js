import React from 'react'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO/SEO'
import ArticleContainer from '../containers/ArticleContainer'
import Layout from '../containers/Layout'

const IndexPage = ({ data, pageContext }) => {
    const { group, index, pageCount, additionalContext } = pageContext

    const { catName, catSlug } = additionalContext
    const catDesc =
        additionalContext.catDescription || `${catName} category archive page`

    return (
        <Layout>
            <SEO title={catName} description={catDesc} />

            <ArticleContainer>
                <h1>
                    Category:
                    {catName}
                </h1>

                <div id="post-list" className="post-list">
                    {group.map((node) => (
                        <ArticleCard
                            key={node.slug}
                            count={index}
                            base64={node.base64}
                            slug={node.slug}
                            image={node.image}
                            imageTitle={node.imageTitle}
                            imageAlt={node.imageAlt}
                            title={node.title}
                            modifiedForUser={node.modifiedForUser}
                            modifiedForSchema={node.modifiedForSchema}
                            excerpt={node.excerpt}
                        />
                    ))}
                </div>

                <Pagination
                    prefix={`category/${catSlug}`}
                    currentPage={index}
                    numPages={pageCount}
                />
            </ArticleContainer>
        </Layout>
    )
}

export default IndexPage
