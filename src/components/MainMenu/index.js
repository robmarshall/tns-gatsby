import React from "react"
import { Link , StaticQuery, graphql } from "gatsby"

import _ from "lodash";

const Menu = ({ data }) => (
    <div>
        <h1>Main Menu</h1>
        <ul>

            {data.map((item) => (
                <li key={( item.object_slug || _.kebabCase(item.title) )}>
                    <Link to={item.url}>
                        {item.title}
                    </Link>
                </li>
            )
            )}

        </ul>
    </div>
)

const MainMenu = ({props}) => (
    <StaticQuery
        query={graphql`
      query {
        wpgraphql {
          menus {
            nodes {
              menuItems {
                nodes {
                  url
                  label
                  target
                }
              }
            }
          }
        }
      }
    `}
        // eslint-disable-next-line
        render={data => <Menu data={data.wpgraphql.menus.nodes[0].menuItems.nodes} {...props} />}
    />
)

export default MainMenu
