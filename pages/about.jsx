import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { PageHeading, SiteHead } from '../src/components';

import config from '../config.json';

export default function About() {
  return (
    <Box my={4}>
      <SiteHead pageTitle="About" />
      <PageHeading />
      <Box display="flex" justifyContent="center">
        <Typography variant="p" align="center">
          {config.about}
        </Typography>
        <Image src={config.profile} position="relative" fill />
      </Box>
    </Box>
  );
}
