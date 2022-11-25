import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import config from '../../config.json';

function NavLink({ text, pathname, currentPath }) {
  const isCurrentLocation = pathname === currentPath;
  return (
    <Link
      href={pathname}
      variant="subtitle1"
      sx={{
        fontStyle: isCurrentLocation && 'italic',
      }}
      underline={isCurrentLocation ? 'none' : 'always'}
    >
      {text}
    </Link>
  );
}

export default function PageHeading() {
  const router = useRouter();

  const links = [
    {
      text: 'About',
      pathname: '/about',
    },
    {
      text: 'Portfolio',
      pathname: '/portfolio',
    },
    {
      text: 'Contact',
      pathname: '/contact',
    },
  ];

  return (
    <Box mb={4}>
      <Box>
        <Link href="/" underline="none">
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            {config.heading}
          </Typography>
        </Link>
      </Box>
      <Box display="flex" justifyContent="center">
        <Stack direction="row" spacing={1}>
          {links.map((link) => (
            <NavLink
              key={link.pathname}
              text={link.text}
              pathname={link.pathname}
              currentPath={router.pathname}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
