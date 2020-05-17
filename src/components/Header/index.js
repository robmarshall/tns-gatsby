import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Container from '../../containers/Container'
import MainMenu from '../MainMenu'
import './header.scss'

const Header = ({ siteTitle }) => (
    <header className="header">
        <Container>
            <div className="header__wrap">
                <h1 className="header__title">
                    <Link className="header__link" to="/">
                        {siteTitle}
                    </Link>
                </h1>
                <MainMenu />
            </div>
        </Container>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
