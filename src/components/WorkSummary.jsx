import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export default function WorkSummary({ item }) {
  return (
    <Box>
      <Link href={`/portfolio/${item.scope.slug}`} underline="hover">
        <Typography variant="h5" fontWeight={800} component="h2" gutterBottom>
          {item.scope.title}
        </Typography>
      </Link>
      <Typography variant="subtitle2" gutterBottom>
        {item.scope.description}
      </Typography>
    </Box>
  );
}
