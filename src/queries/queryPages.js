module.exports = `
query GET_PAGES($first:Int, $after:String){
  wpgraphql {
    pages(
      first: $first
      after:$after
      where: {status: PUBLISH}
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        slug
        title
        date
        modified
        content
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
        featuredImage {
          sourceUrl
          altText
          title
          mediaItemId
          modified
          imageFile {
            childImageSharp {
              facebook: fixed(width: 1024, height: 512) {
                  src
                  width
                  height
              }
              twitter: fixed(width: 1200, height: 630) {
                  src
              }
            }
          }
        }
      }
    }
  }
}`
