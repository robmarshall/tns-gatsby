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
            facebook: fixed(width: 1024, height: 512) {
                src
                width
                height
            }
        }
    }

    fragment Twitter on File {
        childImageSharp {
            twitter: fixed(width: 1200, height: 630) {
                src
            }
        }
    }

    fragment PostPreviewContent on WpPost {
        slug
        title
        cleanTitle
        databaseId
        excerpt
        cleanExcerpt
        modifiedForUser: modified(formatString: "D MMMM YYYY")
        modifiedForSchema: modified(formatString: "YYYY-MM-DD, HH:mm:ss")
        featuredImage {
            node {
                remoteFile {
                    ...Thumbnail
                }
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
                remoteFile {
                    ...Thumbnail
                    ...Facebook
                    ...Twitter
                }
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
        seo {
            metaDesc
            title
        }
    }

    fragment PageContent on WpPage {
        title
        cleanTitle
        content
        featuredImage {
            node {
                remoteFile {
                    ...Facebook
                    ...Twitter
                }
            }
        }
        seo {
            metaDesc
            metaKeywords
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphDescription
            opengraphTitle
            title
            twitterDescription
            twitterTitle
        }
    }

    fragment RelatedContent on WpPost {
        slug
        title
        cleanTitle
        featuredImage {
            node {
                remoteFile {
                    ...SmallThumbnail
                }
            }
        }
    }
`
