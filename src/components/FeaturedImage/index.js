import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { imageStyle } from './style.module.scss'

const FeaturedImage = ({ image, title, alt }) => {
    if (image) {
        return (
            <GatsbyImage
                alt={alt}
                className={imageStyle}
                image={image}
                loading="eager"
                title={title}
            />
        )
    }

    return null
}

export default FeaturedImage
