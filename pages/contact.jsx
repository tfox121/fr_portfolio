import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { ContactForm, PageHeading, SiteHead } from '../src/components';

export default function Contact() {
  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box py={5}>
        <SiteHead pageTitle="Contact Me" />
        <PageHeading />
        <Box display="flex" justifyContent="center">
          <ContactForm />
        </Box>
      </Box>
    </Container>
  );
}
