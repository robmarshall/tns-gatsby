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
        startDateTime,
        title,
        url,
        articleBody,
    }) => {
        const { logo } = useSiteDefaults()

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
                        name: 'Robert Marshall',
                    },
                    publisher: {
                        '@type': 'Person',
                        url: siteUrl,
                        image: logoData.src,
                        name: 'Robert Marshall',
                    },
                    mainEntityOfPage: {
                        '@type': 'WebSite',
                        '@id': url,
                    },
                    wordCount: null,
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
