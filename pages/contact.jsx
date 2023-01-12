import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { ContactForm, PageHeading, SiteHead } from '../src/components';
import config from '../config.json';

export default function Contact({ contactMdx }) {
  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box py={5} display="flex" flexDirection="column">
        <SiteHead pageTitle="Contact Me" />
        <PageHeading />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <MDXRemote {...contactMdx} />
          <ContactForm />
        </Box>
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  const contactMdx = await serialize(config.contact);
  return { props: { contactMdx } };
}
