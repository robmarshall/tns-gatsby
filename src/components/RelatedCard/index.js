import React from 'react'
import Link from '../Link'
import Img from 'gatsby-image'
import he from 'he'
import get from 'lodash/get'
import './relatedcard.scss'

const RelatedCard = ({ node }) => {
    const { slug, featuredImage, title } = node

    const image = get(
        featuredImage,
        'imageFile.childImageSharp.image500',
        false
    )

    const featuredAlt = get(featuredImage, 'altText', false)
    const featuredTitle = get(featuredImage, 'title', false)

    return (
        <div key={slug} className="relatedCard">
            <Link to={slug}>
                <div>
                    <Img
                        className="relatedCard_image"
                        fluid={image}
                        title={featuredTitle}
                        alt={featuredAlt}
                    />
                </div>

                <h3 className="relatedCard_title">{he.unescape(title)}</h3>
            </Link>
        </div>
    )
}

export default RelatedCard
