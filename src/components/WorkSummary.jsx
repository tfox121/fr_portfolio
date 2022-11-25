import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function WorkSummary({ item }) {
  return (
    <Box my={1}>
      <Typography variant="h5" fontWeight={800} component="h2" gutterBottom>
        {item.scope.title}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {item.scope.description}
      </Typography>
    </Box>
  );
}
