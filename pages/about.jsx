import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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
        <Grid container columns={11}>
          <Grid item xs={5}>
            <MDXRemote {...aboutMdx} />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs="auto">
            <ResponsiveImage
              src={config.profile}
              alt="Frances Richens"
              priority
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  const aboutMdx = await serialize(config.about);
  return { props: { aboutMdx } };
}
