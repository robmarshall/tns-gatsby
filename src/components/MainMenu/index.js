import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import slugify from '../../utils/slugify'
import Link from '../Link'
import './menu.scss'

const Menu = ({ data }) => (
    <nav className="main-menu">
        <ul>
            {data.map((item) => (
                <li key={slugify(item.label)}>
                    <Link to={item.url}>{item.label}</Link>
                </li>
            ))}
        </ul>
    </nav>
)

const MainMenu = ({ props }) => (
    <StaticQuery
        query={graphql`
            query {
                allWpMenu {
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
        `}
        // eslint-disable-next-line
        render={(data) => {
            console.log(data)
            return (
                <Menu
                    data={data.allWpMenu.nodes[0].menuItems.nodes}
                    {...props}
                />
            )
        }}
    />
)

export default MainMenu
