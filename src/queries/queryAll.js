module.exports = `
    {
        allWordpressPage (
            sort: { fields: [date], order: DESC }
            filter: { status: { eq: "publish" } }
        ){
            edges {
                node {
                    id
                    slug
                    template
                }
            }
        }
        allWordpressPost (
            sort: { fields: [date], order: DESC }
            filter: { status: { eq: "publish" } }
        ){
            edges {
                node {
                    id
                    slug
                    template
                    format
                    title
                    date
                    excerpt
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
                        title
                        alt_text
                    }
                    categories {
                        name
                    }
                    tags {
                        name
                    }
                }
            }
        }
    }
`
