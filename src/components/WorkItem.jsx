import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MDXRemote } from 'next-mdx-remote';

export default function WorkItem({ item, tags, selectedTags }) {
  return (
    <Box my={2}>
      <Typography variant="h5" fontWeight={800} component="h2">
        {item.scope.title}
      </Typography>
      <Typography variant="subtitle2">{item.scope.description}</Typography>
      <MDXRemote {...item} scope={item.scope} />
      <Stack direction="row" spacing={1}>
        {item.scope.tags.map((tagSlug) => {
          const selected = selectedTags.includes(tagSlug);
          const tagName = tags.filter((tag) => tag.slug === tagSlug)[0].name;
          return (
            <Chip
              key={tagSlug}
              label={tagName}
              color={selected ? 'primary' : 'secondary'}
              variant={selected ? 'filled' : 'outlined'}
              size="small"
              sx={{
                fontSize: 12,
                height: 26,
                padding: 0.5,
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
