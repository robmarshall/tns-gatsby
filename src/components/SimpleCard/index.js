import React from 'react'
import Link from '../Link'
import Img from 'gatsby-image'
import he from 'he'
import get from 'lodash/get'
import './simplecard.scss'

const SimpleCard = ({ node }) => {
    const { slug, featuredImage, title } = node

    const image = get(
        featuredImage,
        'imageFile.childImageSharp.image500',
        false
    )

    const featuredAlt = get(featuredImage, 'altText', false)
    const featuredTitle = get(featuredImage, 'title', false)

    return (
        <div key={slug} className="simpleCard">
            <Link to={slug}>
                <Img
                    className="simpleCard_image"
                    fluid={image}
                    title={featuredTitle}
                    alt={featuredAlt}
                />
                <h3 className="simpleCard_title">{he.unescape(title)}</h3>
            </Link>
        </div>
    )
}

export default SimpleCard
