import React from 'react'
import Layout from '../containers/Layout'
import SEO from '../components/SEO/SEO'
import Hero from '../components/Hero'
import RecentArticles from '../components/RecentArticles'
import Contact from '../components/Contact'

const IndexPage = () => (
    <Layout>
        <SEO
            yoastTitle="Rob Marshall | Gatsby & Headless WordPress Developer Leeds UK"
            keywords={[
                'html5',
                'sass',
                'gatsby',
                'react',
                'wordpress',
                'restapi',
                'node',
                'npm',
                'netlify',
                'graphql',
                'es6',
            ]}
        />
        <Hero />
        <RecentArticles />
        <Contact />
    </Layout>
)

export default IndexPage
