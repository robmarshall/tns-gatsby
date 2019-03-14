import Img from "gatsby-image";
import React from "react"

const ImageChecker = props => {

    const fluidImage = props.featuredMedia ? props.featuredMedia.localFile.childImageSharp.fluid : null

    if(fluidImage && fluidImage.src){

        const altTag = props.featuredMedia.alt_text ? props.featuredMedia.alt_text : null;
        const title = props.featuredMedia.title ? props.featuredMedia.title : null;
        const className = props.className ? props.className : null;

        return (
            <div>
                <Img className={className} fluid={fluidImage} title={title} alt={altTag}/>
            </div>
        );
    } else {
        return "";
    }

};

export default ImageChecker
