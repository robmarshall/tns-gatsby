import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
//import MainMenu from '../MainMenu'
import './header.scss'
//             <MainMenu />
const Header = ({ siteTitle }) => (
    <header className="header">
        <div className="header__wrap">
            <h1 className="header__title">
                <Link className="header__link" to="/">
                    {siteTitle}
                </Link>
            </h1>
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
