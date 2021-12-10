import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import CategoryList from '../CategoryList'

const List = ({ data }) => {
    return (
        <div>
            <CategoryList cats={data} />
        </div>
    )
}

const AllCategoriesList = () => (
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

export default AllCategoriesList
