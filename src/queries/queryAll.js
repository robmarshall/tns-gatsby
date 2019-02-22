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
                                fluid(maxWidth: 1000) {
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
        }
    }
`
