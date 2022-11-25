import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { PageHeading, ResponsiveImage, SiteHead } from '../src/components';

import config from '../config.json';

export default function About() {
  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box my={4}>
        <SiteHead pageTitle="About" />
        <PageHeading />
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography variant="p" align="center">
            {config.about}
          </Typography>
          <ResponsiveImage src={config.profile} />
        </Box>
      </Box>
    </Container>
  );
}
