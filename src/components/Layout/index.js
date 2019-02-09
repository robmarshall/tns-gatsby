import React from 'react'
import Helmet from 'react-helmet'

import Header from '../Header'
import './index.css'

import MainMenu from '../MainMenu'

const Layout = ({children}) => (
  <div>
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
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
