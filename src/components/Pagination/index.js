import React from 'react'
import { Link } from 'gatsby'

import './pagination.scss'

function makePageUrl(prefix, pageNum) {
    const end = pageNum === 0 ? '' : `page/${pageNum + 1}`
    const fullString = `${prefix}${end}`
    const cleanUrl = fullString.replace(/^\/+/g, '')
    return process.env.GATSBY_BASE_URL + '/' + cleanUrl
}

const NextPrevLink = ({ next, prev, prefix, currentPage, totalPages }) => {
    let linkClass = 'paginationLink paginationLink-'
    let pageNum
    let humanNum
    let label

    if (prev) {
        linkClass += 'prev'
        pageNum = currentPage - 2
        humanNum = currentPage - 1
        label = 'Prev'
    }

    if (next) {
        linkClass += 'next'
        pageNum = currentPage
        humanNum = currentPage + 1
        label = 'Next'
    }

    if ((prev && currentPage === 1) || currentPage === totalPages) {
        return null
    }

    return (
        <li className="paginationItem paginationWord">
            <Link to={makePageUrl(prefix, pageNum)} className={linkClass}>
                <span className="paginationLabel">
                    {`${label} Page (${humanNum})`}
                </span>
            </Link>
        </li>
    )
}

const PageLink = ({ pageNum, prefix, isCurrent, humanNum }) => {
    return (
        <li key={`pagination-number${humanNum}`} className="paginationItem">
            <Link
                to={makePageUrl(prefix, pageNum)}
                className={
                    isCurrent
                        ? 'paginationLink paginationLink-live'
                        : 'paginationLink'
                }
                aria-current={isCurrent ? 'page' : null}
            >
                <span className="paginationLabel">Page </span>
                {humanNum}
            </Link>
        </li>
    )
}

const Pagination = ({ prefix, currentPage, pageCount }) => {
    if (pageCount > 1) {
        return (
            <div className="pagination-wrap">
                <nav className="pagination" aria-label="Pagination Navigation">
                    <ul className="paginationList">
                        <NextPrevLink
                            prev
                            prefix={prefix}
                            currentPage={currentPage}
                            totalPages={pageCount}
                        />
                        {Array.from({ length: pageCount }, (_, i) => {
                            const humanNum = i + 1

                            if (
                                currentPage + 3 > humanNum &&
                                currentPage - 3 < humanNum
                            ) {
                                return (
                                    <PageLink
                                        key={`pageNumber-${humanNum}`}
                                        prefix={prefix}
                                        pageNum={i}
                                        isCurrent={currentPage === humanNum}
                                        humanNum={humanNum}
                                    />
                                )
                            }
                            return null
                        })}
                        <NextPrevLink
                            next
                            prefix={prefix}
                            currentPage={currentPage}
                            totalPages={pageCount}
                        />
                    </ul>
                </nav>
            </div>
        )
    }
    return null
}

export default Pagination
