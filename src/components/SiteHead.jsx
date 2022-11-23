import Head from 'next/head';
import React from 'react';

import config from '../../config.json';

export default function SiteHead() {
  const siteKeywords = config.site_keywords.reduce((acc, currVal, index) => {
    if (index === 0) return currVal.keyword;
    return `${acc}, ${currVal.keyword}`;
  }, '');

  return (
    <Head>
      <title>{config.site_title}</title>
      <meta name="description" content={config.site_description} />
      <meta name="author" content={config.author} />
      <meta name="keywords" content={siteKeywords} />
    </Head>
  );
}
