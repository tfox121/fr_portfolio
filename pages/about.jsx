import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { PageHeading, ResponsiveImage, SiteHead } from '../src/components';
import config from '../config.json';

export default function About({ aboutMdx }) {
  const smallDisplay = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box py={5}>
        <SiteHead pageTitle="About" />
        <PageHeading />
        <Grid
          container
          columns={11}
          direction={smallDisplay ? 'column-reverse' : 'row'}
        >
          <Grid
            item
            md={5}
            xs={11}
            textAlign={smallDisplay ? 'center' : 'left'}
          >
            <MDXRemote {...aboutMdx} />
          </Grid>
          <Grid item md={1} xs={0} />
          <Grid item xs="auto">
            <Box display="flex" justifyContent="center" mb={2}>
              <ResponsiveImage
                src={config.profile}
                alt="Frances Richens"
                priority
              />
            </Box>
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
