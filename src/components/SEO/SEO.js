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
    facebookImage = null,
    twitterImage = null,
    pathname = null,
    article = false,
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
        image: image || '',
        facebookImage: facebookImage || '',
        twitterImage: twitterImage || '',
        url: `${siteUrl}${pathname || '/'}`,
      };

      // Remove all html tags
      seo.description = seo.description.replace(/<(?:.|\n)*?>/gm, '');

      return (
        <>
          <Helmet title={seo.title}>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
          </Helmet>
          <Facebook
            locale={seo.locale}
            siteName={seo.siteName}
            pageUrl={seo.url}
            type={article ? 'article' : null}
            title={seo.title}
            description={seo.description}
            image={seo.facebookImage}
            appID={facebookAppID}
          />
          <Twitter
            username={twitterUsername}
            title={seo.title}
            description={seo.description}
            image={seo.twitterImage}
          />
        </>
      );
    }}
  />
);

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    pathname: PropTypes.string,
    article: PropTypes.bool,
};

export default SEO;
