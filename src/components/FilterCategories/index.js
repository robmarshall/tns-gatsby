import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Link from '../Link'
import slugify from '../../utils/slugify'
import style from './style.module.scss'

const List = ({ data }) => {
    return (
        <div className={style.wrap}>
            <p className={style.cat__title}>Filter by category:</p>
            <ul className={style.cats}>
                {data.map((cat) => (
                    <li key={slugify(cat.name)} className={style.cat}>
                        <Link
                            to={`/category/${slugify(cat.name)}`}
                            className={style.cat__name}
                        >
                            {cat.name}
                        </Link>
                    </li>
                ))}
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
