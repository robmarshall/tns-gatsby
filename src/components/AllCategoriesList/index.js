import React from "react"
import { StaticQuery, graphql } from "gatsby"

import CategoryList from "../CategoryList";

const List = ({ data }) => {

    const allCats = data.map( cat => cat.node );

    return (
        <div>
            <CategoryList cats={allCats}/>
        </div>
    )

}

const AllCategoriesList = ({props}) => (
    <StaticQuery
      query={graphql`
          query {
              allWordpressCategory(filter: { count: { gt: 0 } }){
                edges {
                  node {
                    name
                  }
                }
              }
          }
      `}
      render={data => <List data={data.allWordpressCategory.edges} {...props} />}
    />
)

export default AllCategoriesList
