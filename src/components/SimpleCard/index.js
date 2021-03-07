import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from '../Link'

import { cardWrap, cardLink, cardTitle } from './style.module.scss'

const SimpleCard = ({ node }) => {
    const { cleanTitle, featuredImage, slug } = node

    const image = getImage(featuredImage?.node?.localFile)
    const imageTitle = featuredImage?.node?.title
    const imageAlt = featuredImage?.node?.altText

    return (
        <div key={slug} className={cardWrap}>
            <Link className={cardLink} to={`/${slug}/`}>
                {image && (
                    <GatsbyImage
                        image={image}
                        title={imageTitle}
                        alt={imageAlt}
                    />
                )}
                <h3 className={cardTitle}>{cleanTitle}</h3>
            </Link>
        </div>
    )
}

export default SimpleCard
