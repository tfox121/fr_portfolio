import Box from '@mui/material/Box';
import React from 'react';
import { ContactForm, PageHeading, SiteHead } from '../src/components';

export default function Contact() {
  return (
    <Box my={4}>
      <SiteHead pageTitle="Contact Me" />
      <PageHeading />
      <Box display="flex" justifyContent="center">
        <ContactForm />
      </Box>
    </Box>
  );
}
