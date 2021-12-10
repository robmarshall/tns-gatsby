import React from 'react'
import Link from '../Link'
import { item, itemList, itemName } from './style.module.scss'

const CategoryList = ({ cats }) => {
    if (cats && cats.length > 0) {
        const allCats = cats.map(({ name, uri }) => (
            <li key={uri} className={item}>
                <Link to={uri} className={itemName}>
                    {name}
                </Link>
            </li>
        ))

        return <ul className={itemList}>{allCats}</ul>
    }
    // No Categories
    return null
}

export default CategoryList
