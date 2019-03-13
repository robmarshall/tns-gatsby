import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import _ from "lodash";

const Menu = ({ data }) => (
    <div>
        <h1>Main Menu</h1>
        <ul>

            {data.map((item) =>
                <li key={( item.object_slug || _.kebabCase(item.title) )}>
                    <Link to={item.url}>
                        {item.title}
                    </Link>
                </li>
            )}

        </ul>
    </div>
)

const MainMenu = ({props}) => (
    <StaticQuery
      query={graphql`
          query LayoutQuery {
            allWordpressWpApiMenusMenusItems{
                edges{
                    node{
                        id
                        name
                        items{
                            title
                            url
                            object_slug
                        }
                    }
                }
            }
          }
      `}
      render={data => <Menu data={data.allWordpressWpApiMenusMenusItems.edges[0].node.items} {...props} />}
    />
)

export default MainMenu
