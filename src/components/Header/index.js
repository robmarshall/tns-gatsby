import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./header.scss"

const Header = ({ siteTitle }) => (
  <header className="header">
      <div className="header__wrap">
      <h1 className="header__title">
        <Link className="header__link">
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
