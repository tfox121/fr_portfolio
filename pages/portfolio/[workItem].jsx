import React from 'react';
import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';

import { listTags } from '../../src/lib/tags';
import { composedWorkContent } from '../../src/lib/work';
import { PageHeading, SiteHead, WorkItem } from '../../src/components';

export default function Work({ tags, work }) {
  const router = useRouter();
  const { workItem } = router.query;

  const selectedWorkItem = work.filter((item) => {
    if (item.scope.slug === workItem) return item;
    return null;
  })[0];

  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box my={4}>
        <SiteHead pageTitle={selectedWorkItem.scope.title} />
        <Box position="sticky">
          <PageHeading />
        </Box>
        <Box display="flex">
          <Box
            position="sticky"
            left="100vw"
            ml={5}
            sx={{
              top: 'calc(50vh - 2.5em)',
            }}
          >
            <IconButton onClick={() => router.back()}>
              <ArrowBackIos />
            </IconButton>
          </Box>
          {work && <WorkItem item={selectedWorkItem} tags={tags} />}
        </Box>
      </Box>
    </Container>
  );
}

export const getStaticProps = async () => {
  const tags = listTags();
  const work = await composedWorkContent();
  return {
    props: {
      tags,
      work,
    },
  };
};

export const getStaticPaths = () => {
  const paths = fs
    .readdirSync(path.join(process.cwd(), 'content/work'))
    .map((filename) => ({
      params: {
        workItem: filename.split('.mdx')[0],
      },
    }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};
