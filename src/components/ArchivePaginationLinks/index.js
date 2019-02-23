import React from "react";
import NavLink from "../NavLink";

const ArchivePaginationLinks = props => {

    if( props.pageCount > 1 ){

        return (
            <div className="paginationLinks">
                <div className="previousLink">
                    <NavLink test={props.first} url={props.prevUrl} text={props.prevText} />
                </div>
                <div className="nextLink">
                    <NavLink test={props.last} url={props.nextUrl} text={props.nextText} />
                </div>
            </div>
        );

    } else {
        // No Categories
        return null;
    }

};

export default ArchivePaginationLinks;
