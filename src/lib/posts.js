import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import yaml from 'js-yaml';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), 'content/work');

let postCache;

export function fetchPostContent() {
  if (postCache) {
    return postCache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((it) => it.endsWith('.mdx'))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      const matterData = matterResult.data;
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, '');

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error('file slug does not match file name');
      }

      return matterData;
    });
  // Sort posts by priority
  postCache = allPostsData.sort((a, b) => b.priority - a.priority);
  return postCache;
}

export function countPosts(tag) {
  return fetchPostContent().filter(
    (it) => !tag || (it.tags && it.tags.includes(tag)),
  ).length;
}

export function listPostContent(page, limit, tag) {
  return fetchPostContent()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}

export function slugToPostContent(postContents) {
  const hash = {};
  postContents.forEach((it) => {
    hash[it.slug] = it;
  });
  return hash;
}

export async function composedPostContent() {
  const work = fetchPostContent();
  return Promise.all(
    work.map((item) => {
      const { slug } = item;
      const source = fs.readFileSync(
        slugToPostContent(work)[slug].fullPath,
        'utf8',
      );
      const { content, data } = matter(source, {
        engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) },
      });
      return serialize(content, {
        scope: data,
        parseFrontmatter: true,
      });
    }),
  );
}
