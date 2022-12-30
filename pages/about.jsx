import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { PageHeading, ResponsiveImage, SiteHead } from '../src/components';

import config from '../config.json';

export default function About({ aboutMdx }) {
  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box my={4}>
        <SiteHead pageTitle="About" />
        <PageHeading />
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography variant="p" align="center">
            <MDXRemote {...aboutMdx} />
          </Typography>
          <ResponsiveImage
            src={config.profile}
            alt="Frances Richens"
            priority
          />
        </Box>
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  const aboutMdx = await serialize(config.about);
  return { props: { aboutMdx } };
}
