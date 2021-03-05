import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from '../Link'

import './simplecard.scss'

const SimpleCard = ({ node }) => {
    const { cleanTitle, featuredImage, slug } = node

    const image = getImage(featuredImage?.node?.childImageSharp)
    const imageTitle = featuredImage?.node?.title
    const imageAlt = featuredImage?.node?.altText

    return (
        <div key={slug} className="simpleCard">
            <Link to={`/${slug}`}>
                {image && (
                    <GatsbyImage
                        className="simpleCard_image"
                        image={image}
                        title={imageTitle}
                        alt={imageAlt}
                    />
                )}
                <h3 className="simpleCard_title">{cleanTitle}</h3>
            </Link>
        </div>
    )
}

export default SimpleCard
