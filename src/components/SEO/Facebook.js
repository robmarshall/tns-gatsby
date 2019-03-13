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
    imageAlt = null,
    appID = null,
    updatedTime = null,
}) => (
  <Helmet>
    {locale && <meta property="og:locale" content={locale} />}
    {siteName && <meta property="og:site_name" content={siteName} />}
    {pageUrl && <meta property="og:url" content={pageUrl} />}
    {type && <meta property="og:type" content={type} />}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {image.src && <meta property="og:image" content={image.src} />}
    {image.width && <meta property="og:image:width" content={image.width} />}
    {image.height && <meta property="og:image:height" content={image.height} />}
    {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
    {appID && <meta property="fb:app_id" content={appID} />}
    {(updatedTime && type) && <meta property="og:updated_time" content={updatedTime} />}
  </Helmet>
);
