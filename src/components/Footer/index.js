import React from 'react'
import './footer.scss'
import '../../utils/sass/layout/layout.scss'

const Footer = ({ siteTitle }) => (
    <footer className="footer">
        <div className="container footer__wrap">
            By{' '}
            <a href="https://www.justlikethis.co.uk" className="footer__link">
                Robert Marshall
            </a>{' '}
            &{' '}
            <a href="https://www.gatsbyjs.org/" className="footer__link">
                Gatsby
            </a>
        </div>
    </footer>
)

export default Footer
