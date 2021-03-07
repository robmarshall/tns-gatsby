import React from 'react'
import slugify from '../../utils/slugify'
import Link from '../Link'
import { wrap, itemList, item, itemName, mainTitle } from './style.module.scss'

const TagList = ({ tags }) => {
    if (tags && tags.length > 0) {
        const allTags = tags.map((tag) => (
            <li key={slugify(tag.name)} className={item}>
                <Link to={`/tag/${slugify(tag.name)}`} className={itemName}>
                    {tag.name}
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
