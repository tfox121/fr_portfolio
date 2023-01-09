import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { MDXRemote } from 'next-mdx-remote';

import WorkTags from './WorkTags';

export default function WorkItem({ item, tags, selectedTags }) {
  const noMargin = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box my={2}>
      <Box display="flex" mb={2}>
        {noMargin && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton href="/portfolio">
              <ArrowBackIos />
            </IconButton>
          </Box>
        )}
        <Box>
          <Typography variant="h5" fontWeight={800} component="h2" gutterBottom>
            {item.scope.title}
          </Typography>
          <WorkTags
            scope={item.scope}
            tags={tags}
            selectedTags={selectedTags}
          />
        </Box>
      </Box>
      <MDXRemote {...item} scope={item.scope} />
    </Box>
  );
}
