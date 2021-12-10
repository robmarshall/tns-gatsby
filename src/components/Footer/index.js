import React from 'react'
import Link from '../Link'
import { footer } from './style.module.scss'
import Container from '../../containers/Container'

const Footer = ({ siteTitle }) => (
    <footer className={footer}>
        <Container>
            By <Link to="/">Robert Marshall</Link> &{' '}
            <a href="https://www.gatsbyjs.org/">Gatsby</a>
        </Container>
    </footer>
)

export default Footer
