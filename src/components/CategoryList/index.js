import React from "react";
import { Link } from "gatsby";

const CategoryList = ({ cats }) => {

    if( cats.length > 0 ){

        const allCats = cats.map((cat) => (
            <li key={cat.slug} className="cat">
                {cat.name}
            </li>
        ));

        return (
            <div className="cat-wrap">
                <h3>Categories</h3>
                <ul className="cats">
                    {allCats}
                </ul>
            </div>
        );

    } else {
        // No Categories
        return null;
    }

};

export default CategoryList;
