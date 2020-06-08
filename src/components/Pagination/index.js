import React from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'

import './pagination.scss'

function makePageUrl(prefix, pageNum) {
    const end = pageNum === 0 ? '' : `/page/${pageNum + 1}`
    const fullString = `${prefix}${end}`
    const cleanString = fullString.replace(/^\/+/g, '')
    return `${process.env.GATSBY_BASE_URL}/${cleanString}`
}

const NextPrevLink = ({
    next,
    prev,
    prefix,
    currentPage,
    totalPages,
    location,
}) => {
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
            <Link
                to={makePageUrl(prefix, pageNum, location)}
                className={linkClass}
            >
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

const Pagination = ({ prefix, currentPage, numPages }) => {
    if (numPages > 1) {
        return (
            <Location>
                {({ location }) => (
                    <div className="pagination-wrap">
                        <nav
                            className="pagination"
                            aria-label="Pagination Navigation"
                        >
                            <ul className="paginationList">
                                <NextPrevLink
                                    prev
                                    prefix={prefix}
                                    currentPage={currentPage}
                                    totalPages={numPages}
                                    location={location}
                                />
                                {Array.from({ length: numPages }, (_, i) => {
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
                                                isCurrent={
                                                    currentPage === humanNum
                                                }
                                                humanNum={humanNum}
                                                location={location}
                                            />
                                        )
                                    }
                                    return null
                                })}
                                <NextPrevLink
                                    next
                                    prefix={prefix}
                                    currentPage={currentPage}
                                    totalPages={numPages}
                                    location={location}
                                />
                            </ul>
                        </nav>
                    </div>
                )}
            </Location>
        )
    }
    return null
}

export default Pagination
