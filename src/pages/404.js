import React from 'react'
import AllCategoriesList from '../components/AllCategoriesList'
import RootImage from '../components/RootImage'
import Container from '../containers/Container'
import Layout from '../containers/Layout'

import './404.scss'

const NotFoundPage = () => (
    <Layout>
        <Container>
            <h1>Couldn&#39;t Find That Page!</h1>
            <p>
                You just hit a page that doesn&#39;t exist... the
                sadness. It might be here sometime in the future? It
                might have been here sometime in the past. Unfortunatly
                it is not here right now :(
            </p>

            <RootImage
                filename="confused-squirrel.jpg"
                className="squirrel"
            />

            <div className="suggestion">
                <p>Maybe these categories will help:</p>
                <AllCategoriesList />
            </div>
        </Container>
    </Layout>
)

export default NotFoundPage
