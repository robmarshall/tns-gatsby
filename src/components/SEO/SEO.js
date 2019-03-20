import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery } from 'gatsby'
import Twitter from './Twitter'
import Facebook from './Facebook'
import _ from 'lodash'

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
    tags = null,
}) => (
    <StaticQuery
        query={graphql`
            query SEOQuery {
                site {
                    siteMetadata {
<<<<<<< HEAD
                        locale
                        siteName
                        defaultTitle: title
                        defaultDescription: description
                        siteUrl: url
=======
                        fallbackLocale: locale
                        fallbackSiteName: siteName
                        fallbackTitle: title
                        fallbackDescription: description
                        fallbackSiteUrl: url
>>>>>>> f58bee2af60f66c0739a3095e189518928802c8d
                        twitterUsername: author
                        facebookAppID
                    }
                }
<<<<<<< HEAD
=======
                wordpressWpSettings {
                    locale: language
                    setSiteName: title
                    setDescription: description
                    url
                }
>>>>>>> f58bee2af60f66c0739a3095e189518928802c8d
            }
        `}
        render={({
            site: {
                siteMetadata: {
<<<<<<< HEAD
                    locale,
                    siteName,
                    defaultTitle,
                    defaultDescription,
                    siteUrl,
=======
                    fallbackLocale,
                    fallbackSiteName,
                    fallbackTitle,
                    fallbackDescription,
                    fallbackSiteUrl,
>>>>>>> f58bee2af60f66c0739a3095e189518928802c8d
                    twitterUsername,
                    facebookAppID,
                },
            },
<<<<<<< HEAD
        }) => {
            const seo = {
                locale: locale || 'en_GB',
                title:
                    title || defaultTitle
                        ? (title || defaultTitle) + ' | ' + siteName
                        : siteName,
                description: description || defaultDescription,
                imageAlt: imageAlt || title || '',
                facebookImage: facebookImage || '',
                twitterImage: twitterImage || '',
                url: `${siteUrl}${pathname || '/'}`,
            }

            seo.description = cleanupDescription(seo.description)

            return (
                <>
                    <Helmet title={seo.title}>
                        {seo.description && (
                            <meta
                                property="description"
                                content={seo.description}
                            />
                        )}
                        {image && (
                            <meta property="image" content={siteUrl + image} />
                        )}

                        {publishedTime && article && (
                            <meta
                                property="article:published_time"
                                content={publishedTime}
                            />
                        )}
                        {modifiedTime && article && (
                            <meta
                                property="article:modified_time"
                                content={modifiedTime}
                            />
                        )}

=======
            wordpressWpSettings: { locale, setSiteName, setDescription, url },
        }) => {
            const siteName = setSiteName || fallbackSiteName
            const pageTitle = title || setDescription || fallbackTitle
            const siteUrl = url || fallbackSiteUrl

            const seo = {
                locale: locale || fallbackLocale || 'en_GB',
                title: pageTitle ? pageTitle + ' | ' + siteName : siteName,
                description: description || fallbackDescription,
                imageAlt: imageAlt || title || '',
                facebookImage: facebookImage || '',
                twitterImage: twitterImage || '',
                url: `${siteUrl}${pathname || '/'}`,
            }

            seo.description = cleanupDescription(seo.description)

            return (
                <>
                    <Helmet title={_.unescape(seo.title)}>
                        {seo.description && (
                            <meta
                                property="description"
                                content={_.unescape(seo.description)}
                            />
                        )}
                        {image && <meta property="image" content={image} />}

                        {publishedTime && article && (
                            <meta
                                property="article:published_time"
                                content={publishedTime}
                            />
                        )}
                        {modifiedTime && article && (
                            <meta
                                property="article:modified_time"
                                content={modifiedTime}
                            />
                        )}

>>>>>>> f58bee2af60f66c0739a3095e189518928802c8d
                        {tags &&
                            tags.length > 0 &&
                            tags.map(tag => (
                                <meta
                                    key={tag.slug}
                                    property="article:tag"
                                    content={tag.name}
                                />
                            ))}
                    </Helmet>
                    <Facebook
                        locale={seo.locale}
<<<<<<< HEAD
                        baseUrl={siteUrl}
                        siteName={seo.siteName}
                        pageUrl={seo.url}
                        type={article ? 'article' : null}
                        title={seo.title}
                        description={seo.description}
=======
                        siteName={_.unescape(seo.siteName)}
                        pageUrl={seo.url}
                        type={article ? 'article' : null}
                        title={_.unescape(seo.title)}
                        description={_.unescape(seo.description)}
>>>>>>> f58bee2af60f66c0739a3095e189518928802c8d
                        image={seo.facebookImage}
                        imageAlt={seo.imageAlt}
                        appID={facebookAppID}
                        updatedTime={modifiedTime}
                    />
                    <Twitter
<<<<<<< HEAD
                        baseUrl={siteUrl}
                        username={twitterUsername}
                        title={seo.title}
                        description={seo.description}
=======
                        username={twitterUsername}
                        title={_.unescape(seo.title)}
                        description={_.unescape(seo.description)}
>>>>>>> f58bee2af60f66c0739a3095e189518928802c8d
                        image={seo.twitterImage}
                    />
                </>
            )
        }}
    />
)

SEO.propTypes = {
    locale: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    facebookImage: PropTypes.object,
    twitterImage: PropTypes.string,
    pathname: PropTypes.string,
    article: PropTypes.bool,
    publishedTime: PropTypes.string,
    modifiedTime: PropTypes.string,
    tags: PropTypes.array,
}

function cleanupDescription(description) {
    let clean = description.replace(/<(?:.|\n)*?>/gm, '')
    clean = _.unescape(clean)
    return clean
}

export default SEO
