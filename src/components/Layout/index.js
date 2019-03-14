import React from 'react'

import Header from '../Header'
import Footer from '../Footer'

import SEO from "../SEO/SEO"

import '../../utils/sass/base/base.scss';
import '../../utils/sass/layout/layout.scss';

const Layout = ({children}) => (
  <div>

    <SEO />

    <Header siteTitle="T&S"/>

    <div className="article-container">
        {children}
    </div>

    <Footer />

  </div>
)

export default Layout
