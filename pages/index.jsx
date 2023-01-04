import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { SiteHead } from '../src/components';

import config from '../config.json';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <SiteHead pageTitle="Home" />
        <Box mb={2}>
          <Typography variant="h2" component="h1">
            {config.heading}
          </Typography>
        </Box>
        <Box my={2}>
          <Typography variant="p">{config.introduction}</Typography>
        </Box>
        <Box mt={2}>
          <Stack direction="row" spacing={3}>
            <Link href="/about" variant="h5">
              About
            </Link>
            <Link href="/portfolio" variant="h5">
              Portfolio
            </Link>
            <Link href="/contact" variant="h5">
              Contact
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
