import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery } from 'gatsby';
import Twitter from './Twitter';
import Facebook from './Facebook';

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
            locale
            siteName
            defaultTitle: title
            defaultDescription: description
            siteUrl: url
            twitterUsername: author
            facebookAppID
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: {
          locale,
          siteName,
          defaultTitle,
          defaultDescription,
          siteUrl,
          twitterUsername,
          facebookAppID,
        },
      },
    }) => {
      const seo = {
        locale: ( locale || 'en_GB' ),
        title: ( title || defaultTitle ) ? ( title || defaultTitle ) + ' | ' + siteName : siteName,
        description: description || defaultDescription,
        imageAlt: imageAlt || title || '',
        facebookImage: facebookImage || '',
        twitterImage: twitterImage || '',
        url: `${siteUrl}${pathname || '/'}`,
      };

      // Remove all html tags
      seo.description = seo.description.replace(/<(?:.|\n)*?>/gm, '');

      return (
        <>
          <Helmet title={seo.title}>
            {seo.description && <meta property="description" content={seo.description} />}
            {image && <meta property="image" content={image} />}

            {(publishedTime && article) && <meta property="article:published_time" content={publishedTime} />}
            {(modifiedTime && article) && <meta property="article:modified_time" content={modifiedTime} />}

            {(tags && tags.length > 0) && tags.map(tag => <meta property="article:tag" content={tag.name} />)}


            // ADD TAGS

          </Helmet>
          <Facebook
            locale={seo.locale}
            siteName={seo.siteName}
            pageUrl={seo.url}
            type={article ? 'article' : null}
            title={seo.title}
            description={seo.description}
            image={seo.facebookImage}
            imageAlt={seo.imageAlt}
            appID={facebookAppID}
            updatedTime={modifiedTime}
          />
          <Twitter
            username={twitterUsername}
            title={seo.title}
            description={seo.description}
            image={seo.twitterImage.src}
          />
        </>
      );
    }}
  />
);

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
    tags: PropTypes.array
};

export default SEO;
