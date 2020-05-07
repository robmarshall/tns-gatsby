import React from 'react'
import he from 'he'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import useSiteDefaults from '../../hooks/useSiteDefaults'
import limitString from '../../utils/limitString'

import decodeEntities from '../../utils/decodeEntities'

import SchemaOrg from './SchemaOrg'
import { isPost } from './SeoHelpers'

const SEO = ({
    address,
    author,
    datePublished,
    dateModified,
    description,
    facebookPostImage,
    postType,
    title,
    twitterPostImage,
    startDateTime,
    eventOver,
    url,
    yoastTitle,
    articleBody,
}) => {
    // Pull data from WordPress and Gatsby config
    const { settings, site, facebookImage, twitterImage } = useSiteDefaults()
    const wpSettings = settings.allSettings
    const fallback = site.siteMetadata

    const siteName = wpSettings.generalSettingsTitle || fallback.siteName
    const tagLine =
        wpSettings.generalSettingsDescription || fallback.description
    const facebookImageFallback = get(
        facebookImage,
        'childImageSharp.fixed.src',
        false
    )
    const twitterImageFallback = get(
        twitterImage,
        'childImageSharp.fixed.src',
        false
    )

    // Set the title from the browser. If there is a page title, set properly. Otherwise fall back
    const browserTitle =
        yoastTitle || title
            ? `${title} | ${siteName}`
            : `${siteName} | ${tagLine}`

    const metaTitle = yoastTitle || title || siteName

    // Take the description/excerpt and remove all html tags
    const postDescription = limitString(
        decodeEntities(description || tagLine),
        150
    )

    const facebookMetaImage =
        facebookPostImage ||
        facebookImageFallback ||
        twitterPostImage ||
        twitterImageFallback ||
        false
    const twitterMetaImage =
        twitterPostImage ||
        twitterImageFallback ||
        facebookPostImage ||
        facebookImageFallback ||
        false

    const postUrl = url ? `${fallback.siteUrl}${url}` : fallback.siteUrl

    return (
        <>
            <Helmet>
                {/* General tags */}
                <title>{he.unescape(browserTitle)}</title>
                {postDescription && (
                    <meta
                        name="description"
                        content={he.unescape(postDescription)}
                    />
                )}
                {facebookMetaImage && (
                    <meta name="image" content={facebookMetaImage} />
                )}
                <link rel="canonical" href={postUrl} />

                {/* OpenGraph tags */}
                <meta property="og:url" content={postUrl} />
                {isPost(postType) ? (
                    <meta property="og:type" content="article" />
                ) : null}
                <meta
                    name="title"
                    property="og:title"
                    content={he.unescape(metaTitle)}
                />
                {postDescription && (
                    <meta
                        name="description"
                        property="og:description"
                        content={he.unescape(postDescription)}
                    />
                )}
                {facebookMetaImage && (
                    <meta
                        name="image"
                        property="og:image"
                        content={fallback.siteUrl + facebookMetaImage}
                    />
                )}
                {fallback.facebookAppID && (
                    <meta
                        property="fb:app_id"
                        content={fallback.facebookAppID}
                    />
                )}
                {datePublished && (
                    <meta property="PublishDate" content={datePublished} />
                )}
                {dateModified && (
                    <meta property="LastModifiedDate" content={dateModified} />
                )}
                {author && (
                    <meta name="author" property="Creator" content={author} />
                )}

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={fallback.author} />
                <meta name="twitter:title" content={he.unescape(metaTitle)} />
                {postDescription && (
                    <meta
                        name="twitter:description"
                        content={he.unescape(postDescription)}
                    />
                )}
                {twitterMetaImage && (
                    <meta
                        name="twitter:image"
                        content={fallback.siteUrl + twitterMetaImage}
                    />
                )}
            </Helmet>
            <SchemaOrg
                author={author}
                url={url}
                title={he.unescape(metaTitle)}
                image={fallback.siteUrl + facebookMetaImage}
                description={he.unescape(postDescription)}
                datePublished={datePublished}
                dateModified={dateModified}
                address={address}
                startDateTime={startDateTime}
                siteUrl={fallback.siteUrl}
                organization="Thoughts and Stuff"
                postType={postType}
                defaultTitle={he.unescape(tagLine)}
                articleBody={articleBody}
            />
        </>
    )
}

export default SEO
