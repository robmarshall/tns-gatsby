import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import slugify from '../../utils/slugify'
import Link from '../Link'
import { wrap, item, itemList, itemName, mainTitle } from './style.module.scss'

const List = ({ data }) => {
    const toIgnore = [
        'Weekly Rundown',
        'Design',
        'Inspiration',
        'Uncategorised',
        'UX',
    ]

    return (
        <div className={wrap}>
            <p className={mainTitle}>Filter by category:</p>
            <ul className={itemList}>
                {data.map((cat) => {
                    if (!toIgnore.includes(cat.name)) {
                        return (
                            <li key={slugify(cat.name)} className={item}>
                                <Link
                                    to={`/category/${slugify(cat.name)}`}
                                    className={itemName}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        )
                    }
                    return false
                })}
            </ul>
        </div>
    )
}

const FilterCategories = () => (
    <StaticQuery
        query={graphql`
            query {
                allWpCategory {
                    nodes {
                        name
                    }
                }
            }
        `}
        render={(data) => <List data={data.allWpCategory.nodes} />}
    />
)

export default FilterCategories
