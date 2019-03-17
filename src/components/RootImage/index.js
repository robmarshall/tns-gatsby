import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

/**
 * https://noahgilmore.com/blog/easy-gatsby-image-components/
 */

const RootImage = props => (
    <StaticQuery
        query={graphql`
            query {
                images: allFile {
                    edges {
                        node {
                            relativePath
                            name
                            childImageSharp {
                                fluid(maxWidth: 700) {
                                    base64
                                    aspectRatio
                                    src
                                    srcSet
                                    sizes
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => {
            const image = data.images.edges.find(n => {
                return n.node.relativePath.includes(props.filename)
            })
            if (!image) {
                return null
            }

            const imageSizes = image.node.childImageSharp.fluid
            return (
                <Img
                    alt={props.alt}
                    sizes={imageSizes}
                    className={props.className}
                />
            )
        }}
    />
)

export default RootImage
