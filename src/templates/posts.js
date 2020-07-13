import React from 'react'
import { graphql } from 'gatsby'
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

    const { currentPage } = pageInfo

    const { archivePath } = pageContext

    return (
        <Layout>
            <ArticleContainer>
                {currentPage === 1 && <FilterCategories />}
                <div id="post-list" className="post-list">
                    {nodes.map((node, count) => {
                        const image =
                            node?.featuredImage?.node?.remoteFile
                                ?.childImageSharp?.fluid || false
                        const imageTitle =
                            node?.featuredImage?.node?.imageTitle || ''
                        const imageAlt =
                            node?.featuredImage?.node?.imageAlt || ''

                        return (
                            <ArticleCard
                                key={node.slug}
                                count={count}
                                slug={node.slug}
                                image={image}
                                imageTitle={imageTitle}
                                imageAlt={imageAlt}
                                title={node.title}
                                modifiedForUser={node.modifiedForUser}
                                modifiedForSchema={node.modifiedForSchema}
                                excerpt={node.cleanExcerpt}
                            />
                        )
                    })}
                </div>

                <Pagination
                    prefix="/"
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
