import React from "react";
import NavLink from "../NavLink";
import "./pagination.scss"

const ArchivePaginationLinks = props => {

    const {pageCount} = props

    if( pageCount > 1 ){

        const next = (
            <div className="pagination__links pagination__links--next">
                <NavLink test={props.last} url={props.nextUrl} text={props.nextText} />
            </div>
        );

        const prev = (
            <div className="pagination__links pagination__links--prev">
                <NavLink test={props.first} url={props.prevUrl} text={props.prevText} />
            </div>
        );

        return (
            <div className="pagination__wrap">
                { prev }
                { next }
            </div>
        );

    }
    // No Categories
    return null;


};

export default ArchivePaginationLinks;
