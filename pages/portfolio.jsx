import Link from 'next/link';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import config from '../config.json';
import { listTags } from '../src/lib/tags';
import { composedWorkContent } from '../src/lib/work';
import { PageHeading, SiteHead, WorkItem } from '../src/components';

export default function Portfolio({ tags, work }) {
  const [selectedTags, setselectedTags] = useState(tags.map((tag) => tag.slug));

  const handleClick = (clickedTag) => {
    const selected = selectedTags.includes(clickedTag);
    if (selected) {
      setselectedTags(selectedTags.filter((tag) => tag !== clickedTag));
      return;
    }
    setselectedTags([clickedTag, ...selectedTags]);
  };

  return (
    <Box my={4}>
      <SiteHead pageTitle="Portfolio" />
      <PageHeading />
      <Box>
        <Stack direction="row" spacing={1}>
          {tags.map((tag) => {
            const selected = selectedTags.includes(tag.slug);
            return (
              <Chip
                key={tag.slug}
                label={tag.name}
                onClick={() => handleClick(tag.slug)}
                color={selected ? 'primary' : 'secondary'}
                variant={selected ? 'filled' : 'outlined'}
                sx={{
                  padding: 0.5,
                }}
              />
            );
          })}
        </Stack>
      </Box>
      <Box>
        {work.map((item) => {
          let tagEnabled = false;
          item.scope.tags.forEach((tag) => {
            if (selectedTags.includes(tag)) {
              tagEnabled = true;
            }
          });

          if (!tagEnabled) return null;

          return (
            <React.Fragment key={item.scope.slug}>
              <WorkItem item={item} tags={tags} selectedTags={selectedTags} />
              <Divider variant="middle" />
            </React.Fragment>
          );
        })}
      </Box>
      <Box mt={4}>
        <Link href={config.linkedin_account_url} target="_blank" passHref>
          <IconButton component="div">
            <LinkedInIcon fontSize="large" color="primary" />
          </IconButton>
        </Link>
      </Box>
    </Box>
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
