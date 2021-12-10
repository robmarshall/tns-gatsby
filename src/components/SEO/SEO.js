import React from 'react'
import { Helmet } from 'react-helmet'
import useSiteDefaults from '../../hooks/useSiteDefaults'
import decodeEntities from '../../utils/decodeEntities'
import SchemaOrg from './SchemaOrg'
import { isPost } from './SeoHelpers'

const SEO = ({
    address,
    author,
    dateModified,
    description,
    facebookPostImage,
    postType,
    title,
    twitterPostImage,
    url,
    keywords,
    yoastTitle,
    articleBody,
}) => {
    // Pull data from WordPress and Gatsby config
    const { settings, site, facebookImage, twitterImage } = useSiteDefaults()
    const wpSettings = settings.allSettings
    const meta = site.siteMetadata

    const siteName = meta.title
    let tagLine = meta.description
    if (postType === 'post') {
        tagLine = wpSettings.generalSettingsDescription
    }
    const facebookImageFallback =
        facebookImage?.childImageSharp?.fixed?.src || false

    const twitterImageFallback =
        twitterImage?.childImageSharp?.fixed?.src || false

    const pageDescription = description || tagLine

    // Set the title from the browser. If there is a page title, set properly. Otherwise fall back
    let browserTitle = yoastTitle
    if (!browserTitle) {
        if (title) {
            browserTitle = `${title} | ${meta.title}`
        }
        if (!browserTitle) {
            browserTitle = `${meta.title} | ${meta.description}`
        }
    }

    browserTitle = decodeEntities(browserTitle)

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

    const postUrl = url ? `${meta.siteUrl}${url}` : meta.siteUrl

    return (
        <>
            <Helmet>
                {/* General tags */}
                <title>{browserTitle}</title>
                {pageDescription && (
                    <meta name="description" content={pageDescription} />
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
                <meta name="title" property="og:title" content={browserTitle} />
                {description && (
                    <meta
                        name="description"
                        property="og:description"
                        content={description}
                    />
                )}
                {facebookMetaImage && (
                    <meta
                        name="image"
                        property="og:image"
                        content={meta.siteUrl + facebookMetaImage}
                    />
                )}
                {meta.facebookAppID && (
                    <meta property="fb:app_id" content={meta.facebookAppID} />
                )}
                {dateModified && (
                    <meta property="LastModifiedDate" content={dateModified} />
                )}
                {author && (
                    <meta name="author" property="Creator" content={author} />
                )}

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={meta.author} />
                <meta name="twitter:title" content={browserTitle} />
                {description && (
                    <meta name="twitter:description" content={description} />
                )}
                {twitterMetaImage && (
                    <meta
                        name="twitter:image"
                        content={meta.siteUrl + twitterMetaImage}
                    />
                )}
                {keywords?.length > 0 && (
                    <meta name="keywords" content={keywords.join(`, `)} />
                )}
            </Helmet>
            <SchemaOrg
                author={author}
                url={url}
                title={browserTitle}
                image={meta.siteUrl + facebookMetaImage}
                description={description}
                dateModified={dateModified}
                siteUrl={meta.siteUrl}
                postType={postType}
                defaultTitle={tagLine}
                articleBody={articleBody}
            />
        </>
    )
}

export default SEO
