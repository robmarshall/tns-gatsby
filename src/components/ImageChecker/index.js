import Img from "gatsby-image";
import React from "react"

const ImageChecker = ({ featuredMedia }) => {

    const fluidImage = featuredMedia ? featuredMedia.localFile.childImageSharp.fluid : null

    if(fluidImage && fluidImage.src){
        return (
            <div>
                <Img fluid={fluidImage}/>
            </div>
        );
    } else {
        return "";
    }

};

export default ImageChecker
