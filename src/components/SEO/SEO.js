import React from "react";
import { graphql, StaticQuery } from "gatsby";
import _ from "lodash";
import Helmet from "react-helmet";
import Facebook from "./Facebook";
import Twitter from "./Twitter";

const cleanupDescription = (description) => {
    let clean = description.replace(/<(?:.|\n)*?>/gm, "");
    clean = _.unescape(clean);
    return clean;
}

const SEO = ({
    title = null,
    description = null,
    image = null,
    imageAlt = null,
    facebookImage = null,
    twitterImage = null,
    pathname = null,
    article = false,
    publishedTime = null,
    modifiedTime = null,
    tags = null
}) => (
    <StaticQuery
        query={graphql`
      query SEOQuery {
        site {
          siteMetadata {
            fallbackLocale: locale
            fallbackSiteName: siteName
            fallbackTitle: title
            fallbackDescription: description
            siteUrl: url
            twitterUsername: author
            facebookAppID
          }
        }
        wordpressWpSettings {
          locale: language
          setSiteName: title
          setDescription: description
        }
      }
    `}
        render={({
            site: {
                siteMetadata: {
                    fallbackLocale,
                    fallbackSiteName,
                    fallbackTitle,
                    fallbackDescription,
                    siteUrl,
                    twitterUsername,
                    facebookAppID
                }
            },
            wordpressWpSettings: { locale, setSiteName, setDescription }
        }) => {
            const siteName = setSiteName || fallbackSiteName;
            const pageTitle = title || setDescription || fallbackTitle;

            const seo = {
                locale: locale || fallbackLocale || "en_GB",
                title: pageTitle ? `${pageTitle  } | ${  siteName}` : siteName,
                description: description || fallbackDescription,
                imageAlt: imageAlt || title || "",
                facebookImage: facebookImage || "",
                twitterImage: twitterImage || "",
                url: `${siteUrl}${pathname || "/"}`
            };

            seo.description = cleanupDescription(seo.description);

            return (
                <>
                    <Helmet title={_.unescape(seo.title)}>
                        {seo.description && (
                            <meta
                                property="description"
                                content={_.unescape(seo.description)}
                            />
                        )}
                        {image && <meta property="image" content={siteUrl + image} />}

                        {publishedTime && article && (
                            <meta property="article:published_time" content={publishedTime} />
                        )}
                        {modifiedTime && article && (
                            <meta property="article:modified_time" content={modifiedTime} />
                        )}

                        {tags &&
              tags.length > 0 &&
              tags.map(tag => (
                  <meta
                      key={_.kebabCase(tag.name)}
                      property="article:tag"
                      content={tag.name}
                  />
              ))}
                    </Helmet>
                    <Facebook
                        locale={seo.locale}
                        baseUrl={siteUrl}
                        siteName={_.unescape(seo.siteName)}
                        pageUrl={seo.url}
                        type={article ? "article" : null}
                        title={_.unescape(seo.title)}
                        description={_.unescape(seo.description)}
                        image={seo.facebookImage}
                        imageAlt={seo.imageAlt}
                        appID={facebookAppID}
                        updatedTime={modifiedTime}
                    />
                    <Twitter
                        username={twitterUsername}
                        baseUrl={siteUrl}
                        title={_.unescape(seo.title)}
                        description={_.unescape(seo.description)}
                        image={seo.twitterImage}
                    />
                </>
            );
        }}
    />
);

export default SEO;
