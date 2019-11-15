import React from "react";
import { Link } from "gatsby";
import _ from "lodash";
import './cats.scss';

const CategoryList = ({ cats }) => {

    if( cats && cats.length > 0 ){

        const allCats = cats.map(cat => (
            <li key={_.kebabCase(cat.name)} className="cat">
                <Link to={`category/${_.kebabCase(cat.name)}`} className="cat__name">{cat.name}</Link>
            </li>
        ));

        return (
            <div className="cats__wrap">
                <ul className="cats">
                    {allCats}
                </ul>
            </div>
        );

    }
    // No Categories
    return null;


};

export default CategoryList;
