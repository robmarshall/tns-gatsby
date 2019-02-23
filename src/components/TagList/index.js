import React from "react";
import { Link } from "gatsby";
import _ from "lodash";

const TagList = ({ tags }) => {

    if( tags && tags.length > 0 ){

        const allTags = tags.map((tag) => (
            <li key={tag.slug} className="tag">
                <Link to={`tag/${_.kebabCase(tag.name)}`}>{tag.name}</Link>
            </li>
        ));

        return (
            <div className="tag-wrap">
                <ul className="tags">
                    {allTags}
                </ul>
            </div>
        );

    } else {
        // No Tags
        return null;
    }

};

export default TagList;
