import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import MainMenu from "../MainMenu"
import "./header.scss"
import '../../sass/layout/layout.scss';

const Header = ({ siteTitle }) => (
    <header className="header">
        <div className="container header__wrap">
            <h1 className="header__title">
                <Link className="header__link" to="/">
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
