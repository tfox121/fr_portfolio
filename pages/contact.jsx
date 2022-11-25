import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { ContactForm, PageHeading, SiteHead } from '../src/components';

export default function Contact() {
  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box my={4}>
        <SiteHead pageTitle="Contact Me" />
        <PageHeading />
        <Box display="flex" justifyContent="center">
          <ContactForm />
        </Box>
      </Box>
    </Container>
  );
}
