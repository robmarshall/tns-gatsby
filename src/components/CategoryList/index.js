import React from 'react'
import slugify from '../../utils/slugify'
import Link from '../Link'
import './cats.scss'

const CategoryList = ({ cats }) => {
    if (cats && cats.length > 0) {
        const allCats = cats.map((cat) => (
            <li key={slugify(cat.name)} className="cat">
                <Link
                    to={`/category/${slugify(cat.name)}`}
                    className="cat__name"
                >
                    {cat.name}
                </Link>
            </li>
        ))

        return (
            <div className="cats__wrap">
                <ul className="cats">{allCats}</ul>
            </div>
        )
    }
    // No Categories
    return null
}

export default CategoryList
