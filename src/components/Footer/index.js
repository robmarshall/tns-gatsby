import React from 'react'
import { footer } from './style.module.scss'
import Container from '../../containers/Container'

const Footer = ({ siteTitle }) => (
    <footer className={footer}>
        <Container>
            By <a href="https://robertmarshall.dev">Robert Marshall</a> &{' '}
            <a href="https://www.gatsbyjs.org/">Gatsby</a>
        </Container>
    </footer>
)

export default Footer
