import React from 'react'
import Img from 'gatsby-image'
import Link from '../Link'

import './simplecard.scss'

const SimpleCard = ({ node }) => {
    const { slug, imageSmall, imageTitle, imageAlt, title } = node

    return (
        <div key={slug} className="simpleCard">
            <Link to={slug}>
                {imageSmall && (
                    <Img
                        className="simpleCard_image"
                        fluid={imageSmall}
                        title={imageTitle}
                        alt={imageAlt}
                    />
                )}
                <h3 className="simpleCard_title">{title}</h3>
            </Link>
        </div>
    )
}

export default SimpleCard
