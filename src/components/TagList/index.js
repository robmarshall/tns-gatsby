import React from "react";
import { Link } from "gatsby";
import _ from "lodash";
import './tags.scss';

const TagList = ({ tags }) => {

    if( tags && tags.length > 0 ){

        const allTags = tags.map((tag) => (
            <li key={tag.slug} className="tag">
                <Link to={`tag/${_.kebabCase(tag.name)}`} className="tag__name">{tag.name}</Link>
            </li>
        ));

        return (
            <div className="tags__wrap">
                <h4 className="tags__title">Tags:</h4>
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
