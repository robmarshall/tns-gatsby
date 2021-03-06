import React from 'react'
import slugify from '../../utils/slugify'
import Link from '../Link'
import { item, itemList, itemName } from './style.module.scss'

const CategoryList = ({ cats }) => {
    if (cats && cats.length > 0) {
        const allCats = cats.map((cat) => (
            <li key={slugify(cat.name)} className={item}>
                <Link
                    to={`/category/${slugify(cat.name)}`}
                    className={itemName}
                >
                    {cat.name}
                </Link>
            </li>
        ))

        return <ul className={itemList}>{allCats}</ul>
    }
    // No Categories
    return null
}

export default CategoryList
