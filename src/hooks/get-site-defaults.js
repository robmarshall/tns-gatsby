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
                      locale
                      siteName
                      title
                      description
                      author
                      url
                      siteUrl
                      facebookAppID
                    }
                }
            }
        `
    )
}

export default AllSiteDefaults
