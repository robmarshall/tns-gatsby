import React from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'

import SEO from "../../components/SEO/SEO"

import '../../sass/base/base.scss';

const Layout = ({children}) => (
    <div>

        <SEO />

        <Header siteTitle="T&S" />

        {children}

        <Footer />

    </div>
)

export default Layout
