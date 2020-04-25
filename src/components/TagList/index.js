import React from 'react'
import Link from '../Link'
import slugify from '../../utils/slugify'
import './tags.scss'

const TagList = ({ tags }) => {
    if (tags && tags.length > 0) {
        const allTags = tags.map(tag => (
            <li key={slugify(tag.name)} className="tag">
                <Link to={`tag/${slugify(tag.name)}`} className="tag__name">
                    {tag.name}
                </Link>
            </li>
        ))

        return (
            <div className="tags__wrap">
                <h4 className="tags__title">Tags:</h4>
                <ul className="tags">{allTags}</ul>
            </div>
        )
    }
    // No Tags
    return null
}

export default TagList
