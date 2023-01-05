import Head from 'next/head';
import React from 'react';

import config from '../../config.json';

export default function SiteHead({ pageTitle }) {
  const siteKeywords = config.site_metadata.site_keywords.reduce(
    (acc, currVal, index) => {
      if (index === 0) return currVal.keyword;
      return `${acc}, ${currVal.keyword}`;
    },
    '',
  );

  return (
    <Head>
      <title>{`${config.site_metadata.site_title} - ${pageTitle}`}</title>
      <meta
        name="description"
        content={config.site_metadata.site_description}
      />
      <meta name="author" content={config.site_metadata.author} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
