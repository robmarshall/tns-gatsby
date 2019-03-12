import React from 'react'

import Header from '../Header'
import SEO from "../SEO/SEO"
import MainMenu from '../MainMenu'

import './index.css'

const Layout = ({children}) => (
  <div>

    <SEO />

    <Header siteTitle="Gatsby"/>

    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
        <MainMenu/>
      {children}
    </div>
  </div>
)

export default Layout
