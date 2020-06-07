module.exports = `
query GET_POSTS($first:Int, $after:String){
  wpgraphql {
    posts(
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
        modifiedForUser
        modifiedForSchema
        publishedForUser
        publishedForSchema
        excerpt
        cleanTitle
        cleanExerpt
        seo {
            metaDesc
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
        featuredImage {
          sourceUrl
          altText
          title
          databaseId
          modified
          imageFile {
            childImageSharp {
              image700: fluid(maxWidth: 700) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
              }
              image500: fluid(maxWidth: 500) {
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
