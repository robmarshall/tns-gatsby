import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import MainMenu from '../MainMenu'
import {
    header,
    headerWrap,
    headerTitle,
    headerLink,
} from './style.module.scss'

const Header = ({ siteTitle }) => (
    <header className={header}>
        <div className={headerWrap}>
            <h1 className={headerTitle}>
                <Link className={headerLink} to="/">
                    {siteTitle}
                </Link>
            </h1>
            <MainMenu />
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
