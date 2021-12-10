import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
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
                {data.map(({ uri, name }) => {
                    if (!toIgnore.includes(name)) {
                        return (
                            <li key={uri} className={item}>
                                <Link to={uri} className={itemName}>
                                    {name}
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
                        uri
                    }
                }
            }
        `}
        render={(data) => <List data={data.allWpCategory.nodes} />}
    />
)

export default FilterCategories
