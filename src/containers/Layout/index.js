import React from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'

import SEO from '../../components/SEO/SEO'

import './layout.scss'
import '../../sass/base/base.scss'

const Layout = ({ children }) => (
    <div>
        <SEO />
        <Header siteTitle="T&S" />
        <div className="layout">{children}</div>
        <Footer />
    </div>
)

export default Layout
