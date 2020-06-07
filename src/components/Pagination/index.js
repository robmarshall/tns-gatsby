import React from 'react'
import { Link } from 'gatsby'

import './pagination.scss'

function makePageUrl(prefix, pageNum, type) {
    const end = pageNum === 0 ? '' : `/page/${pageNum + 1}`
    const fullString = `/${prefix}${end}`
    return fullString.replace(/^\/+/g, '')
}

const Pagination = ({ type, prefix, currentPage, numPages }) => {
    if (numPages > 1) {
        return (
            <div className="pagination-wrap">
                <nav className="pagination" aria-label="Pagination Navigation">
                    <ul className="paginationList">
                        {currentPage > 1 && (
                            <li className="paginationItem paginationWord">
                                <Link
                                    to={makePageUrl(
                                        prefix,
                                        currentPage - 2,
                                        type
                                    )}
                                    className="paginationLink paginationLink-prev"
                                >
                                    <span className="paginationLabel">
                                        {`(${currentPage - 1})`}
                                    </span>
                                </Link>
                            </li>
                        )}
                        {Array.from({ length: numPages }, (_, i) => {
                            const humanNum = i + 1

                            if (
                                currentPage + 3 > humanNum &&
                                currentPage - 3 < humanNum
                            ) {
                                return (
                                    <li
                                        key={`pagination-number${humanNum}`}
                                        className="paginationItem"
                                    >
                                        <Link
                                            to={makePageUrl(prefix, i, type)}
                                            className={
                                                currentPage === humanNum
                                                    ? 'paginationLink paginationLink-live'
                                                    : 'paginationLink'
                                            }
                                            aria-current={
                                                currentPage === humanNum
                                                    ? 'page'
                                                    : null
                                            }
                                        >
                                            <span className="paginationLabel">
                                                Page{' '}
                                            </span>
                                            {humanNum}
                                        </Link>
                                    </li>
                                )
                            }
                            return null
                        })}
                        {currentPage < numPages && (
                            <li className="paginationItem paginationWord">
                                <Link
                                    to={makePageUrl(prefix, currentPage, type)}
                                    className="paginationLink paginationLink-next"
                                >
                                    <span className="paginationLabel">
                                        {`Next Page (${currentPage + 1})`}
                                    </span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        )
    }
    return null
}

export default Pagination
