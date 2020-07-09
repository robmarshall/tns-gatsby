module.exports = `
query GET_PAGES($skip:Int, $limit:Int){
  allWpPage(filter: {status: {eq: "publish"}}, sort: {fields: dateGmt, order: DESC}, skip: $skip, limit: $limit){
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
        node {
          altText
          title
          localFile {
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
