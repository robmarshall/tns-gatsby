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
                <div id="post-list" className="post-list">
                    {group.map((node, index) => {
                        return (
                            <ArticleCard
                                key={node.slug}
                                count={index}
                                slug={node.slug}
                                image={node.image}
                                imageTitle={node.imageTitle}
                                imageAlt={node.imageAlt}
                                title={node.title}
                                modifiedForUser={node.modifiedForUser}
                                modifiedForSchema={node.modifiedForSchema}
                                publishedForUser={node.publishedForUser}
                                publishedForSchema={node.publishedForSchema}
                                excerpt={node.excerpt}
                            />
                        )
                    })}
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
