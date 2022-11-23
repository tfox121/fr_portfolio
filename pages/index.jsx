import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import fs from 'fs';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import AppBar from '@mui/material/AppBar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AccountCircle from '@mui/icons-material/AccountCircle';

import config from '../config.json';
import { listTags } from '../src/lib/tags';
import { fetchPostContent, slugToPostContent } from '../src/lib/posts';
import { ContactForm } from '../src/components';
import { UserContext } from '../src/hooks';
import Link from 'next/link';

export default function Home({ tags, work }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTags, setselectedTags] = useState(tags.map((tag) => tag.slug));
  const { isAuthenticated, signout } = useContext(UserContext);

  const siteKeywords = config.site_keywords.reduce((acc, currVal, index) => {
    if (index === 0) return currVal.keyword;
    return `${acc}, ${currVal.keyword}`;
  }, '');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (clickedTag) => {
    const selected = selectedTags.includes(clickedTag);
    if (selected) {
      setselectedTags(selectedTags.filter((tag) => tag !== clickedTag));
      return;
    }
    setselectedTags([clickedTag, ...selectedTags]);
  };

  return (
    <Box>
      <Head>
        <title>{config.site_title}</title>
        <meta name="description" content={config.site_description} />
        <meta name="author" content={config.author} />
        <meta name="keywords" content={siteKeywords} />
      </Head>
      {isAuthenticated && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Admin
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => router.push('/admin')}>Admin</MenuItem>
                <MenuItem onClick={signout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
      )}
      <Container maxWidth="md">
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
                  <Box my={2}>
                    <Typography variant="h5" fontWeight={800} component="h2">
                      {item.scope.title}
                    </Typography>
                    <Typography variant="subtitle2">
                      {item.scope.description}
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
                  <Divider variant="middle" />
                </React.Fragment>
              );
            })}
          </Box>
          <ContactForm />
          <Box mt={4}>
            {/* TODO: make button link to config.linkedin_account_url */}
            <Link href={config.linkedin_account_url} target="_blank" passHref>
              <IconButton component="div">
                <LinkedInIcon fontSize="large" color="primary" />
              </IconButton>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
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
