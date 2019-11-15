import React from "react"
import { StaticQuery, graphql } from "gatsby"

import CategoryList from "../CategoryList";

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
            wpgraphql {
              categories {
                nodes {
                  name
                }
              }
            }
          }
      `}

        render={data => <List data={data.wpgraphql.categories.nodes} />}
    />
)

export default AllCategoriesList
