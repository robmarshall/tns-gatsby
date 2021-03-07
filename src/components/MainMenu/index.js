import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import slugify from '../../utils/slugify'
import Link from '../Link'
import { menuNav, menuList, menuItem, menuItemLink } from './style.module.scss'

const Menu = ({ data }) => (
    <nav className={menuNav}>
        <ul className={menuList}>
            {data.map((item) => (
                <li key={slugify(item.label)} className={menuItem}>
                    <Link
                        className={menuItemLink}
                        target={item.target}
                        to={item.url}
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
)

const MainMenu = ({ props }) => (
    <StaticQuery
        query={graphql`
            query {
                wpMenu(locations: { eq: HEADER_MENU }) {
                    menuItems {
                        nodes {
                            url
                            label
                            target
                        }
                    }
                }
            }
        `}
        // eslint-disable-next-line
        render={(data) => {
            return <Menu data={data.wpMenu.menuItems.nodes} {...props} />
        }}
    />
)

export default MainMenu
