import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';

import { listTags } from '../src/lib/tags';
import { composedWorkContent } from '../src/lib/work';
import {
  PageHeading,
  SiteHead,
  WorkItem,
  WorkSummary,
  WorkTags,
} from '../src/components';

export default function Portfolio({ tags, work }) {
  const [selectedTags, setselectedTags] = useState(tags.map((tag) => tag.slug));
  const [selectedWork, setSelectedWork] = useState('ethics');
  const [viewingWork, setViewingWork] = useState(false);

  const handleTagClick = (clickedTag) => {
    const selected = selectedTags.includes(clickedTag);
    if (selected) {
      setselectedTags(selectedTags.filter((tag) => tag !== clickedTag));
      return;
    }
    setselectedTags([clickedTag, ...selectedTags]);
  };

  const handleClick = (workSlug) => {
    setSelectedWork(workSlug);
    setViewingWork(true);
  };

  const filterWork = (workArr, slug) =>
    workArr.filter((item) => {
      if (item.scope.slug === slug) return item;
      return null;
    });

  return (
    <Box
      pt={4}
      width="100vw"
      position="absolute"
      sx={{
        height: '100%',
        overflowX: 'hidden',
      }}
    >
      <SiteHead pageTitle="Portfolio" />
      <Box position="sticky">
        <PageHeading />
      </Box>
      <Box
        width="200vw"
        display="flex"
        sx={{
          position: 'absolute',
          left: '0',
          transform: viewingWork ? `translateX(-100vw)` : `translateX(0)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        <Box width="100vw" position="absolute" left="0">
          <Container maxWidth="md">
            <Box display="flex" justifyContent="center" mb={1}>
              <Stack direction="row" spacing={1}>
                {tags.map((tag) => {
                  const selected = selectedTags.includes(tag.slug);
                  return (
                    <Chip
                      key={tag.slug}
                      label={tag.name}
                      onClick={() => handleTagClick(tag.slug)}
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
                    <Grid container>
                      <Grid item xs={11}>
                        <WorkSummary item={item} />
                        <WorkTags
                          scope={item.scope}
                          tags={tags}
                          selectedTags={selectedTags}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Box height="100%" display="flex" alignItems="center">
                          <IconButton
                            onClick={() => handleClick(item.scope.slug)}
                          >
                            <ArrowForwardIosIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider
                      variant="middle"
                      light
                      sx={{
                        mx: 15,
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </Box>
          </Container>
        </Box>
        <Box
          width="100vw"
          position="absolute"
          left="100vw"
          sx={{
            overflowY: !viewingWork && 'hidden',
            height: viewingWork ? 'inherit' : '100vh',
          }}
        >
          <Box
            position="sticky"
            left="100vw"
            ml={5}
            sx={{
              top: 'calc(50vh - 2.5em)',
            }}
          >
            <IconButton onClick={() => setViewingWork(false)}>
              <ArrowBackIos />
            </IconButton>
          </Box>
          <Container
            maxWidth="md"
            sx={{
              mt: -5,
            }}
          >
            <WorkItem
              item={filterWork(work, selectedWork)[0]}
              tags={tags}
              selectedTags={selectedTags}
            />
          </Container>
        </Box>
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
