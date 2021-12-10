import { useStaticQuery, graphql } from 'gatsby'

function useSiteDefaults() {
    return useStaticQuery(
        graphql`
            {
                settings: wp {
                    allSettings {
                        generalSettingsDescription
                        generalSettingsTitle
                        readingSettingsPostsPerPage
                    }
                }
                site: site {
                    siteMetadata {
                        locale
                        title
                        description
                        author
                        siteUrl
                        facebookAppID
                    }
                }
                logo: file(relativePath: { eq: "logo.png" }) {
                    childImageSharp {
                        gatsbyImageData(layout: FIXED)
                    }
                }
            }
        `
    )
}

export default useSiteDefaults
