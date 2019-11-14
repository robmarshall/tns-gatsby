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
        date(formatString:"YYYY-MM-DD, HH:mm:ss")
        modified(formatString:"YYYY-MM-DD, HH:mm:ss")
        content
        excerpt
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
              image1200: fluid(maxWidth: 1000) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
              }
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
