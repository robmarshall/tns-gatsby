import Img from "gatsby-image";
import React from "react"

const ImageChecker = ({ featuredMedia }) => {

    const fluidImage = featuredMedia ? featuredMedia.localFile.childImageSharp.fluid : null

    return (
        fluidImage &&
        <div>
            <Img fluid={fluidImage}/>
        </div>
    );

};

export default ImageChecker
