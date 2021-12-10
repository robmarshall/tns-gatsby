import React from 'react'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO/SEO'
import ArticleContainer from '../containers/ArticleContainer'
import PostsWrap from '../containers/PostsWrap'
import Layout from '../containers/Layout'

const CatTemplate = ({ data, pageContext }) => {
    const {
        allWpPost: { nodes, pageInfo },
    } = data

    const { currentPage } = pageInfo

    const { archivePath, name, description } = pageContext

    const catDesc = description || `${name} category archive page`

    return (
        <Layout>
            <SEO title={name} description={catDesc} />

            <ArticleContainer>
                <h1>Category: {name}</h1>
                {description && <p>{description}</p>}

                <PostsWrap>
                    {nodes.map((node, count) => {
                        const image = getImage(
                            node?.featuredImage?.node?.thumbnail
                        )
                        const imageTitle =
                            node?.featuredImage?.node?.imageTitle || ''
                        const imageAlt =
                            node?.featuredImage?.node?.imageAlt || ''

                        return (
                            <ArticleCard
                                key={node.uri}
                                count={count}
                                uri={node.uri}
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
                </PostsWrap>

                <Pagination
                    prefix={archivePath}
                    currentPage={pageInfo.currentPage}
                    pageCount={pageInfo.pageCount}
                />
            </ArticleContainer>
        </Layout>
    )
}

export const query = graphql`
    query Category($id: Int!, $offset: Int!, $perPage: Int!) {
        allWpPost(
            limit: $perPage
            skip: $offset
            sort: { fields: date, order: DESC }
            filter: {
                categories: {
                    nodes: { elemMatch: { databaseId: { eq: $id } } }
                }
            }
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

export default CatTemplate
