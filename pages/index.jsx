import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { SiteHead } from '../src/components';

import config from '../config.json';
import theme from '../src/theme';

const links = [
  { text: 'About', href: '/about' },
  { text: 'Portfolio', href: '/portfolio' },
  { text: 'Contact', href: '/contact' },
];

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
          <Typography
            variant="h2"
            color={theme.palette.primary.main}
            align="center"
          >
            {config.heading}
          </Typography>
        </Box>
        <Box my={2}>
          <Typography variant="h6" component="h4">
            {config.introduction}
          </Typography>
        </Box>
        <Box mt={2}>
          <Stack direction="row" spacing={3}>
            {links.map(({ text, href }) => (
              <Link
                key={text}
                href={href}
                variant="h5"
                sx={{
                  textDecorationColor: theme.palette.secondary.contrastText,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                {text}
              </Link>
            ))}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
