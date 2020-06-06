module.exports = `
query GET_FIRST_POST {
  wpgraphql {
    posts(
      first: 1
      after: null
      where: {status: PUBLISH}
    ) {
      pageInfo {
        endCursor
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
              base700: sizes(base64Width: 800, quality: 100) {
                  base64
              }
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
