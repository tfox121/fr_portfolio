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
                />
              );
            })}
          </Stack>
        </Box>
        <ul>
          {work.map((item) => {
            let tagEnabled = false;
            item.tags.forEach((tag) => {
              if (selectedTags.includes(tag)) {
                tagEnabled = true;
              }
            });

            if (!tagEnabled) return null;

            return (
              <li key={item.slug}>
                <MDXRemote {...item.source} scope={item.source.scope} />
              </li>
            );
          })}
        </ul>
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
      const mdxSource = await serialize(content, { scope: data });
      return {
        title: data.title,
        dateString: data.date,
        slug: data.slug,
        description: '',
        tags: data.tags,
        source: mdxSource,
      };
    }),
  );
  return {
    props: {
      tags,
      work: workWithContents,
    },
  };
};
