import Head from 'next/head';
import React from 'react';

export default function SiteHead({ siteMetadata }) {
  const siteKeywords = siteMetadata.site_keywords.reduce(
    (acc, currVal, index) => {
      if (index === 0) return currVal.keyword;
      return `${acc}, ${currVal.keyword}`;
    },
    '',
  );

  return (
    <Head>
      <title>{siteMetadata.site_title}</title>
      <meta name="description" content={siteMetadata.site_description} />
      <meta name="author" content={siteMetadata.author} />
      <meta name="keywords" content={siteKeywords} />
    </Head>
  );
}
