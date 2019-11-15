import React from 'react'

import Footer from '../Footer'
import Header from '../Header'

import SEO from "../SEO/SEO"

import '../../sass/base/base.scss';
import '../../sass/layout/layout.scss';

const Layout = ({children}) => (
    <div>

        <SEO />

        <Header siteTitle="T&S" />

        <div className="article-container">
            {children}
        </div>

        <Footer />

    </div>
)

export default Layout
