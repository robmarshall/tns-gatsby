import React from 'react'

import Container from '../../containers/Container'
import slugify from '../../utils/slugify'
import SimpleCard from '../SimpleCard'

import './relatedcards.scss'

const RelatedCards = ({ relatedPosts }) => {
    const cards = relatedPosts.map((post) => (
        <SimpleCard key={post.slug} node={post} />
    ))

    if (cards) {
        return (
            <Container>
                <div className="post_related">
                    <h2 className="post_related_title">Related Posts</h2>
                    <div className="post_related_wrap">{cards}</div>
                </div>
            </Container>
        )
    }

    return null
}

export default RelatedCards
