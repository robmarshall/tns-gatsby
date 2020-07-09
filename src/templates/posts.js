import React from 'react'
import ArticleCard from '../components/ArticleCard'
import FilterCategories from '../components/FilterCategories'
import Pagination from '../components/Pagination'
import ArticleContainer from '../containers/ArticleContainer'
import Layout from '../containers/Layout'

import '../sass/layout/post.scss'

const Posts = ({ data, pageContext }) => {
    const {
        allWpPost: { nodes, pageInfo },
    } = data

    const { archiveType, archivePath } = pageContext

    return (
        <Layout>
            <ArticleContainer>
                {index === 1 && <FilterCategories />}
                <div id="post-list" className="post-list">
                    {group.map((nodes, count) => {
                        return (
                            <ArticleCard
                                key={node.slug}
                                count={count}
                                slug={node.slug}
                                image={node.image}
                                imageTitle={node.imageTitle}
                                imageAlt={node.imageAlt}
                                title={node.title}
                                modifiedForUser={node.modifiedForUser}
                                modifiedForSchema={node.modifiedForSchema}
                                excerpt={node.excerpt}
                            />
                        )
                    })}
                </div>

                <Pagination
                    prefix=""
                    currentPage={pageInfo.currentPage}
                    pageCount={pageInfo.pageCount}
                />
            </ArticleContainer>
        </Layout>
    )
}

export const query = graphql`
    query Posts($offset: Int!, $perPage: Int!) {
        allWpPost(
            limit: $perPage
            skip: $offset
            sort: { fields: date, order: DESC }
        ) {
            nodes {
                ...PostPreviewContent
            }
            pageInfo {
                currentPage
                pageCount
            }
        }
    }
`

export default Posts
