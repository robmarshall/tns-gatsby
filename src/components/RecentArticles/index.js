import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Container from '../../containers/Container'
import {
    single,
    link,
    singleTitle,
    list,
    title,
    desc,
} from './style.module.scss'

const RecentArticles = () => (
    <div className={list}>
        <Container>
            <h2 className={title}>Recent Articles</h2>
            <StaticQuery
                query={graphql`
                    query {
                        allWpPost(
                            limit: 3
                            sort: { order: DESC, fields: date }
                        ) {
                            nodes {
                                uri
                                title
                                cleanTitle
                                content
                                excerpt
                                cleanExcerpt
                                seo {
                                    metaDesc
                                    title
                                }
                            }
                        }
                    }
                `}
                render={(data) =>
                    data.allWpPost.nodes.map((post) => (
                        <div className={single}>
                            <Link className={link} to={post.uri}>
                                <h3 className={singleTitle}>
                                    {post.cleanTitle}
                                </h3>
                                <div
                                    className={desc}
                                    dangerouslySetInnerHTML={{
                                        __html: post.cleanExcerpt,
                                    }}
                                />
                            </Link>
                        </div>
                    ))
                }
            />
        </Container>
    </div>
)

export default RecentArticles
