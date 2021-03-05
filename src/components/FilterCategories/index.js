import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import slugify from '../../utils/slugify'
import Link from '../Link'
import * as style from './style.module.scss'
import * as styles from './test.css'

const List = ({ data }) => {
    const toIgnore = [
        'Weekly Rundown',
        'Design',
        'Inspiration',
        'Uncategorised',
        'UX',
    ]

    console.log(styles.tester)

    return (
        <div className={style.wrap}>
            <p className={style.cat__title}>Filter by category:</p>
            <ul className={style.cats}>
                {data.map((cat) => {
                    if (!toIgnore.includes(cat.name)) {
                        return (
                            <li key={slugify(cat.name)} className={style.cat}>
                                <Link
                                    to={`/category/${slugify(cat.name)}`}
                                    className={style.cat__name}
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
