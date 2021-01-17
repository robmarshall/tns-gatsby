import React, { useEffect } from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'

import SEO from '../../components/SEO/SEO'

import './layout.scss'
import '../../sass/base/base.scss'

const Layout = ({ children }) => {
    useEffect(() => {
        setTimeout(function () {
            var headID = document.getElementsByTagName('head')[0]
            var newScript = document.createElement('script')
            newScript.type = 'text/javascript'
            newScript.src = 'https://arc.io/widget.min.js#nkJroGnK'
            headID.appendChild(newScript)
        }, 5000)
    })

    return (
        <div>
            <SEO />
            <Header siteTitle="T&S" />
            <div className="layout">{children}</div>
            <Footer />
        </div>
    )
}

export default Layout
