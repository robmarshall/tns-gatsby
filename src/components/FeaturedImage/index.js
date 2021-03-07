import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { imageStyle } from './style.module.scss'

const FeaturedImage = ({ image, title, alt }) => {
    if (image) {
        return (
            <GatsbyImage
                className={imageStyle}
                image={image}
                loading="eager"
                title={title}
                alt={alt}
            />
        )
    }

    return null
}

export default FeaturedImage
