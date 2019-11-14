import { useStaticQuery, graphql } from 'gatsby'

function AllSiteDefaults() {
    return useStaticQuery(
        graphql`
            {
                settings: wpgraphql {
                    allSettings {
                        generalSettingsDescription
                        generalSettingsTitle
                        readingSettingsPostsPerPage
                    }
                }
                site: site {
                    siteMetadata {
                        siteName
                        description
                        author
                        siteUrl
                        facebookAppID
                        graphQlApi
                        customHeaders {
                            Authorization
                        }
                    }
                }
                logoPng: file(relativePath: { eq: "logo.png" }) {
                    childImageSharp {
                        fluid {
                            src
                        }
                    }
                }
                facebookImage: file(
                    relativePath: { eq: "facebook_fallback.jpg" }
                ) {
                    childImageSharp {
                        fixed(width: 1024, height: 512) {
                            src
                        }
                    }
                }
                twitterImage: file(
                    relativePath: { eq: "twitter_fallback.jpg" }
                ) {
                    childImageSharp {
                        fixed(width: 1200, height: 630) {
                            src
                        }
                    }
                }
            }
        `
    )
}

export default AllSiteDefaults
