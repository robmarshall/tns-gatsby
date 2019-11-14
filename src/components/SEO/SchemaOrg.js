import React from "react";
import _ from "lodash";
import Helmet from "react-helmet";
import AllSiteDefaults from "../../hooks/get-site-defaults";

export default React.memo(
    ({
        address,
        author,
        siteUrl,
        datePublished,
        dateModified,
        defaultTitle,
        description,
        image,
        postType,
        organization,
        startDateTime,
        title,
        url,
        articleBody
    }) => {

        const {
            logoPng,
            site: {
                siteMetadata: { siteName },
            },
        } = AllSiteDefaults()

        const logoData = _.get(logoPng, "childImageSharp.fluid", false);

        // Set this as fallback. Overwritten later.
        let schema = [
            {
                "@context": "http://schema.org",
                "@type": "WebSite",
                url,
                name: title,
                alternateName: defaultTitle
            }
        ];

        if (postType === "post") {
            schema = [
                ...schema,
                {
                    "@context": "http://schema.org",
                    "@type": "BlogPosting",
                    url,
                    name: title,
                    alternateName: defaultTitle,
                    headline: title,
                    image: {
                        "@type": "ImageObject",
                        url: image
                    },
                    description,
                    author: {
                        "@type": "Person",
                        name: author
                    },
                    publisher: {
                        "@type": "Organization",
                        url: siteUrl,
                        logo: {
                            "@type": "ImageObject",
                            url: logoData.src,
                            width: 567,
                            height: 544
                        },
                        name: siteName
                    },
                    mainEntityOfPage: {
                        "@type": "WebSite",
                        "@id": url
                    },
                    datePublished,
                    dateModified,
                    articleBody
                }
            ];
        }

        if (postType === "route" || postType === "group") {
            schema = [
                ...schema,
                {
                    "@context": "http://schema.org",
                    "@type": "BlogPosting",
                    url,
                    name: title,
                    alternateName: defaultTitle,
                    headline: title,
                    image: {
                        "@type": "ImageObject",
                        url: image
                    },
                    description,
                    author: {
                        "@type": "Organization",
                        name: "Run Leeds"
                    },
                    publisher: {
                        "@type": "Organization",
                        url: siteUrl,
                        logo: {
                            "@type": "ImageObject",
                            url: logoData.src,
                            width: 567,
                            height: 544
                        },
                        name: "Run Leeds"
                    },
                    mainEntityOfPage: {
                        "@type": "WebSite",
                        "@id": url
                    },
                    datePublished,
                    dateModified,
                    articleBody
                }
            ];
        }

        return (
            <Helmet>
                {/* Schema.org tags */}
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>
        );
    }
);
