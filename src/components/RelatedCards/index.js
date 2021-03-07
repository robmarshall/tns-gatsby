import React from 'react'

import Container from '../../containers/Container'
import slugify from '../../utils/slugify'
import SimpleCard from '../SimpleCard'

import { relatedWrap, relatedCards } from './style.module.scss'

const RelatedCards = ({ relatedPosts }) => {
    const cards = relatedPosts.map((post) => (
        <SimpleCard key={post.slug} node={post} />
    ))

    if (cards) {
        return (
            <Container>
                <div className={relatedWrap}>
                    <h2>Related Posts</h2>
                    <div className={relatedCards}>{cards}</div>
                </div>
            </Container>
        )
    }

    return null
}

export default RelatedCards
