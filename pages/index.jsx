import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import fs from 'fs';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';

import config from '../config.json';
import { listTags } from '../src/lib/tags';
import { fetchPostContent, slugToPostContent } from '../src/lib/posts';

export default function Home({ tags, work }) {
  const [selectedTags, setselectedTags] = useState(tags.map((tag) => tag.slug));

  // useEffectOnceWhen(() => {
  //   setselectedTags(tags.map((tag) => tag.slug));
  // }, !!tags.length);

  const handleClick = (clickedTag) => {
    const selected = selectedTags.includes(clickedTag);
    if (selected) {
      setselectedTags(selectedTags.filter((tag) => tag !== clickedTag));
      return;
    }
    setselectedTags([clickedTag, ...selectedTags]);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1">
          {config.site_title}
        </Typography>
        <Box my={3}>
          <Typography variant="p">{config.site_introduction}</Typography>
        </Box>
        <Box mt={3}>
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
              <>
                <Box key={item.scope.slug} my={2}>
                  <Typography variant="h5" fontWeight={800} component="h2">
                    {item.scope.title}
                  </Typography>
                  <MDXRemote {...item} scope={item.scope} />
                  <Stack direction="row" spacing={1}>
                    {item.scope.tags.map((tagSlug) => {
                      const selected = selectedTags.includes(tagSlug);
                      const tagName = tags.filter(
                        (tag) => tag.slug === tagSlug,
                      )[0].name;
                      return (
                        <Chip
                          key={tagSlug}
                          label={tagName}
                          color={selected ? 'primary' : 'secondary'}
                          variant={selected ? 'filled' : 'outlined'}
                          size="small"
                        />
                      );
                    })}
                  </Stack>
                </Box>
                <Divider variant="middle" />
              </>
            );
          })}
        </Box>
        <Box mt={4}>
          {/* TODO: make button link to config.linkedin_account_url */}
          <IconButton>
            <LinkedInIcon fontSize="large" color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}

export const getStaticProps = async () => {
  const tags = listTags();
  const work = fetchPostContent();
  const workWithContents = await Promise.all(
    work.map(async (item) => {
      const { slug } = item;
      const source = fs.readFileSync(
        slugToPostContent(work)[slug].fullPath,
        'utf8',
      );
      const { content, data } = matter(source, {
        engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
      });
      const mdxSource = await serialize(content, {
        scope: data,
        parseFrontmatter: true,
      });
      return mdxSource;
    }),
  );
  return {
    props: {
      tags,
      work: workWithContents,
    },
  };
};
