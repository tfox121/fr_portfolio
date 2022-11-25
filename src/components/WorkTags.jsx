import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function WorkTags({ scope, tags, selectedTags }) {
  return (
    <Box mb={2}>
      <Stack direction="row" spacing={0.5}>
        {scope.tags.map((tagSlug) => {
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
                fontSize: 11,
                height: 19,
                padding: 0.125,
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
