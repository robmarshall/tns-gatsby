import React from 'react';
import Helmet from 'react-helmet';

export default ({
    locale,
    siteName = null,
    pageUrl = null,
    type = null,
    title = null,
    description = null,
    image = null,
    appID = null,
}) => (
  <Helmet>
    {locale && <meta property="og:locale" content={locale} />}
    {siteName && <meta property="og:site_name" content={siteName} />}
    {pageUrl && <meta property="og:url" content={pageUrl} />}
    {type && <meta property="og:type" content={type} />}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    {appID && <meta property="fb:app_id" content={appID} />}
    // ADD IMAGE SIZES
    // ADD IMAGE ALT
    // ADD UPDATED TIME/DATE
  </Helmet>
);
