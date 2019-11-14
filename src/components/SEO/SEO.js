import React from 'react'
import he from 'he'
import _ from 'lodash'
import Helmet from 'react-helmet'
import sanitizeHtml from 'sanitize-html'
import AllSiteDefaults from '../../hooks/get-site-defaults'
import limitString from '../../utils/limitString'

import SchemaOrg from './SchemaOrg'
import { getSingleType, isPost } from './SeoHelpers'

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
    const { settings, site, facebookImage, twitterImage } = AllSiteDefaults()
    const wpSettings = settings.allSettings
    const fallback = site.siteMetadata

    const siteName = wpSettings.generalSettingsTitle || fallback.siteName
    const tagLine =
        wpSettings.generalSettingsDescription || fallback.description
    const facebookImageFallback = _.get(
        facebookImage,
        'childImageSharp.fixed.src',
        false
    )
    const twitterImageFallback = _.get(
        twitterImage,
        'childImageSharp.fixed.src',
        false
    )

    // Set the title from the browser. If there is a page title, set properly. Otherwise fall back
    const browserTitle =
        yoastTitle || title
            ? `${title}${getSingleType(postType)} | ${siteName}`
            : `${siteName} | ${tagLine}`

    const metaTitle = yoastTitle || title + getSingleType(postType) || siteName

    const sanitizeOptions = {
        allowedTags: [],
        allowedAttributes: {},
    }

    // Take the description/excerpt and remove all html tags
    const postDescription = limitString(
        sanitizeHtml(description || tagLine, sanitizeOptions),
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
                    <meta name="description" content={postDescription} />
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
                <meta property="og:title" content={metaTitle} />
                {postDescription && (
                    <meta property="og:description" content={postDescription} />
                )}
                {facebookMetaImage && (
                    <meta property="og:image" content={facebookMetaImage} />
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
                {author && <meta property="Creator" content={author} />}

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={fallback.author} />
                <meta name="twitter:title" content={metaTitle} />
                {postDescription && (
                    <meta
                        name="twitter:description"
                        content={postDescription}
                    />
                )}
                {twitterMetaImage && (
                    <meta name="twitter:image" content={twitterMetaImage} />
                )}
            </Helmet>
            <SchemaOrg
                author={author}
                url={url}
                title={metaTitle}
                image={facebookMetaImage}
                description={postDescription}
                datePublished={datePublished}
                dateModified={dateModified}
                address={address}
                startDateTime={startDateTime}
                siteUrl={fallback.siteUrl}
                organization="Thoughts and Stuff"
                postType={postType}
                defaultTitle={tagLine}
                articleBody={articleBody}
            />
        </>
    )
}

export default SEO
