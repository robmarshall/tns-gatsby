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
    pathname = null,
    article = false,
}) => (
  <StaticQuery
    query={graphql`
      query SEOQuery {
        site {
          siteMetadata {
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
        title: ( title || defaultTitle ) ? ( title || defaultTitle ) + ' | ' + siteName : siteName,
        description: description || defaultDescription,
        image: `${siteUrl}${image || ''}`,
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
            siteName={seo.siteName}
            pageUrl={seo.url}
            type={article ? 'article' : null}
            title={seo.title}
            description={seo.description}
            image={seo.image}
            appID={facebookAppID}
          />
          <Twitter
            username={twitterUsername}
            title={seo.title}
            description={seo.description}
            image={seo.image}
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
