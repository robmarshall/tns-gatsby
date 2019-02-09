module.exports = `
    {
        allWordpressPage {
            edges {
                node {
                    id
                    slug
                    status
                    template
                }
            }
        }
        allWordpressPost {
            edges {
                node {
                    id
                    slug
                    status
                    template
                    format
                    title
                    date
                    featured_media {
                        localFile {
                          childImageSharp {
                            resolutions(width:300, height:300){
                              src
                              width
                              height
                            }
                          }
                        }
                    }
                }
            }
        }
    }
`
