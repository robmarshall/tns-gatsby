import React from 'react'
import Link from '../Link'
import { wrap, itemList, item, itemName, mainTitle } from './style.module.scss'

const TagList = ({ tags }) => {
    if (tags && tags.length > 0) {
        const allTags = tags.map(({ name, uri }) => (
            <li key={uri} className={item}>
                <Link to={uri} className={itemName}>
                    {name}
                </Link>
            </li>
        ))

        return (
            <div className={wrap}>
                <h4 className={mainTitle}>Tags:</h4>
                <ul className={itemList}>{allTags}</ul>
            </div>
        )
    }
    // No Tags
    return null
}

export default TagList
