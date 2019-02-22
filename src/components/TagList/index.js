import React from "react";
import { Link } from "gatsby";

const TagList = ({ tags }) => {

    if( tags.length > 0 ){

        const allTags = tags.map((tag) => (
            <li key={tag.slug} className="tag">
                {tag.name}
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
