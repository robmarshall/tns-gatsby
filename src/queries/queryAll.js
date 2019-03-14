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
                    date(formatString:"YYYY-MM-DD, HH:mm:ss")
                    modified(formatString:"YYYY-MM-DD, HH:mm:ss")
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
