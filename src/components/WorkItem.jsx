import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MDXRemote } from 'next-mdx-remote';
import WorkTags from './WorkTags';

export default function WorkItem({ item, tags, selectedTags }) {
  return (
    <Box my={2}>
      <Typography variant="h5" fontWeight={800} component="h2" gutterBottom>
        {item.scope.title}
      </Typography>
      <WorkTags scope={item.scope} tags={tags} selectedTags={selectedTags} />
      <MDXRemote {...item} scope={item.scope} />
    </Box>
  );
}
