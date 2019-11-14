import React from "react"
import { StaticQuery, graphql } from "gatsby"

import CategoryList from "../CategoryList";

const List = ({ data }) => {

    const allCats = data.map( cat => cat.node );

    return (
        <div>
            <CategoryList cats={allCats} />
        </div>
    )

}

const AllCategoriesList = ({props}) => (
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
        // eslint-disable-next-line
        render={data => <List data={data.wpgraphql.categories.nodes} {...props} />}
    />
)

export default AllCategoriesList
