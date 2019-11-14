import React from "react";
import NavLink from "../NavLink";
import "./pagination.scss"

const ArchivePaginationLinks = props => {

    const {pageCount, last, first, nextUrl, prevUrl, nextText, prevText} = props

    if( pageCount > 1 ){

        const next = (
            <div className="pagination__links pagination__links--next">
                <NavLink test={last} url={nextUrl} text={nextText} />
            </div>
        );

        const prev = (
            <div className="pagination__links pagination__links--prev">
                <NavLink test={first} url={prevUrl} text={prevText} />
            </div>
        );

        return (
            <div className="pagination__wrap">
                { last ? prev : <div /> }
                { first ? next : <div /> }
            </div>
        );

    }
    // No Categories
    return null;


};

export default ArchivePaginationLinks;
