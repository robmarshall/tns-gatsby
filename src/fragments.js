import { graphql } from 'gatsby'

export const fragments = graphql`
    fragment Thumbnail on WpMediaItem {
        thumbnail: localFile {
            childImageSharp {
                gatsbyImageData(formats: [AUTO, WEBP, AVIF])
            }
        }
    }

    fragment SmallThumbnail on File {
        childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
    }

    fragment Facebook on WpMediaItem {
        facebook: localFile {
            childImageSharp {
                gatsbyImageData(layout: FIXED, width: 1024, height: 512)
            }
        }
    }

    fragment Twitter on WpMediaItem {
        twitter: localFile {
            childImageSharp {
                gatsbyImageData(layout: FIXED, width: 1200, height: 630)
            }
        }
    }

    fragment PostPreviewContent on WpPost {
        uri
        title
        cleanTitle
        content
        databaseId
        excerpt
        cleanExcerpt
        modifiedForUser: modified(formatString: "D MMMM YYYY")
        modifiedForSchema: modified(formatString: "YYYY-MM-DD, HH:mm:ss")
        featuredImage {
            node {
                altText
                title
                ...Thumbnail
            }
        }
        categories {
            nodes {
                name
                description
            }
        }
        tags {
            nodes {
                name
            }
        }
        seo {
            metaDesc
        }
    }

    fragment PostContent on WpPost {
        title
        cleanTitle
        content
        excerpt
        cleanExcerpt
        featuredImage {
            node {
                altText
                title
                ...Thumbnail
                ...Facebook
                ...Twitter
            }
        }
        categories {
            nodes {
                name
                uri
                description
            }
        }
        tags {
            nodes {
                name
                uri
            }
        }
        seo {
            metaDesc
            title
        }
    }

    fragment RelatedContent on WpPost {
        uri
        title
        cleanTitle
        featuredImage {
            node {
                localFile {
                    ...SmallThumbnail
                }
            }
        }
    }
`
