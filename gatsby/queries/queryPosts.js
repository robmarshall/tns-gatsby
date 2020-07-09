module.exports = `
query GET_POSTS($skip:Int, $limit:Int){
  allWpPost(filter: {status: {eq: "publish"}}, sort: {fields: dateGmt, order: DESC}, skip: $skip, limit: $limit){
    pageInfo {
      pageCount
      totalCount
    }
    nodes {
      id
      slug
      title
      date
      modified
      modifiedForUser
      modifiedForSchema
      excerpt
      cleanTitle
      cleanExcerpt
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
        node {
          altText
          title
          localFile {
            childImageSharp {
              image700: fluid(maxWidth: 700) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcSetWebp
                  sizes
              }
              image500: fluid(maxWidth: 500) {
                  base64
                  aspectRatio
                  src
                  srcSet
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
