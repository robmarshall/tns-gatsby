import React, { memo } from 'react'
import { getSrc } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'
import useSiteDefaults from '../../hooks/useSiteDefaults'

export default memo(
    ({
        address,
        author,
        siteUrl,
        dateModified,
        defaultTitle,
        description,
        image,
        postType,
        organization,
        startDateTime,
        title,
        url,
        articleBody,
    }) => {
        const {
            logo,
            site: {
                siteMetadata: { siteName },
            },
        } = useSiteDefaults()

        const logoData = getSrc(logo?.childImageSharp)

        // Set this as fallback. Overwritten later.
        let schema = [
            {
                '@context': 'http://schema.org',
                '@type': 'WebSite',
                url,
                name: title,
                alternateName: defaultTitle,
            },
        ]

        if (postType === 'post') {
            schema = [
                ...schema,
                {
                    '@context': 'http://schema.org',
                    '@type': 'BlogPosting',
                    url,
                    name: title,
                    alternateName: defaultTitle,
                    headline: title,
                    image: {
                        '@type': 'ImageObject',
                        url: image,
                    },
                    description,
                    author: {
                        '@type': 'Person',
                        name: author,
                    },
                    publisher: {
                        '@type': 'Organization',
                        url: siteUrl,
                        logo: {
                            '@type': 'ImageObject',
                            url: logoData.src,
                            width: 567,
                            height: 544,
                        },
                        name: siteName,
                    },
                    mainEntityOfPage: {
                        '@type': 'WebSite',
                        '@id': url,
                    },
                    dateModified,
                    articleBody,
                },
            ]
        }

        if (postType === 'route' || postType === 'group') {
            schema = [
                ...schema,
                {
                    '@context': 'http://schema.org',
                    '@type': 'BlogPosting',
                    url,
                    name: title,
                    alternateName: defaultTitle,
                    headline: title,
                    image: {
                        '@type': 'ImageObject',
                        url: image,
                    },
                    description,
                    author: {
                        '@type': 'Organization',
                        name: 'Run Leeds',
                    },
                    publisher: {
                        '@type': 'Organization',
                        url: siteUrl,
                        logo: {
                            '@type': 'ImageObject',
                            url: logoData.src,
                            width: 567,
                            height: 544,
                        },
                        name: 'Run Leeds',
                    },
                    mainEntityOfPage: {
                        '@type': 'WebSite',
                        '@id': url,
                    },
                    dateModified,
                    articleBody,
                },
            ]
        }

        return (
            <Helmet>
                {/* Schema.org tags */}
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            </Helmet>
        )
    }
)
