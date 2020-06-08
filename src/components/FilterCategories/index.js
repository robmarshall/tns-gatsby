import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import slugify from '../../utils/slugify'
import Link from '../Link'
import style from './style.module.scss'

const List = ({ data }) => {
    const toIgnore = [
        'Weekly Rundown',
        'Design',
        'Inspiration',
        'Uncategorised',
        'UX',
    ]

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
                wpgraphql {
                    categories {
                        nodes {
                            name
                        }
                    }
                }
            }
        `}
        render={(data) => <List data={data.wpgraphql.categories.nodes} />}
    />
)

export default FilterCategories
