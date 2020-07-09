import { graphql } from 'gatsby'

export const fragments = graphql`
    fragment Thumbnail on File {
        childImageSharp {
            fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
    }

    fragment SmallThumbnail on File {
        childImageSharp {
            fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
    }

    fragment Facebook on File {
        childImageSharp {
            fixed(width: 1024, height: 512) {
                src
                width
                height
            }
        }
    }

    fragment Twitter on File {
        childImageSharp {
            fixed(width: 1200, height: 630) {
                src
            }
        }
    }

    fragment PostPreviewContent on WpPost {
        uri
        title
        databaseId
        excerpt
        date(formatString: "LL")
        featuredImage {
            remoteFile {
                ...Thumbnail
            }
        }
        categories {
            nodes {
                name
                slug
                description
            }
        }
        tags {
            nodes {
                name
                slug
            }
        }
    }

    fragment PostContent on WpPost {
        title
        content
        date(formatString: "LL")
        excerpt
        featuredImage {
            remoteFile {
                ...HeroImage
                ...Facebook
                ...Twitter
            }
        }
        categories {
            nodes {
                name
                slug
                description
            }
        }
        tags {
            nodes {
                name
                slug
            }
        }
    }
`
