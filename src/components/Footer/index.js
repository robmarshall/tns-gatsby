import React from 'react'
import './footer.scss'
import Container from '../../containers/Container'

const Footer = ({ siteTitle }) => (
    <footer className="footer">
        <Container>
            <div className="footer__wrap">
                By
                {' '}
                <a href="https://www.robertmarshall.dev" className="footer__link">
                    Robert Marshall
                </a>
                {' '}
                &
                {' '}
                <a href="https://www.gatsbyjs.org/" className="footer__link">
                    Gatsby
                </a>
            </div>
        </Container>
    </footer>
)

export default Footer
