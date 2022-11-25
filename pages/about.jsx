import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { PageHeading, ResponsiveImage, SiteHead } from '../src/components';

import config from '../config.json';

export default function About() {
  return (
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
  );
}
