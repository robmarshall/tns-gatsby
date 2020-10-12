import React from 'react'
import Img from 'gatsby-image'
import Link from '../Link'

import './simplecard.scss'

const SimpleCard = ({ node }) => {
    const { cleanTitle, featuredImage, slug } = node

    const image = featuredImage?.node?.localFile?.childImageSharp?.fluid
    const imageTitle = featuredImage?.node?.title
    const imageAlt = featuredImage?.node?.altText

    return (
        <div key={slug} className="simpleCard">
            <Link to={`/${slug}`}>
                {image && (
                    <Img
                        className="simpleCard_image"
                        fluid={image}
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
