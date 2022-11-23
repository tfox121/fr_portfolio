import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import yaml from 'js-yaml';
import { serialize } from 'next-mdx-remote/serialize';

const worksDirectory = path.join(process.cwd(), 'content/work');

let workCache;

export function fetchWorkContent() {
  if (workCache) {
    return workCache;
  }
  // Get file names under /works
  const fileNames = fs.readdirSync(worksDirectory);
  const allWorksData = fileNames
    .filter((it) => it.endsWith('.mdx'))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(worksDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the work metadata section
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
  // Sort works by priority
  workCache = allWorksData.sort((a, b) => b.priority - a.priority);
  return workCache;
}

export function countWorks(tag) {
  return fetchWorkContent().filter(
    (it) => !tag || (it.tags && it.tags.includes(tag)),
  ).length;
}

export function listWorkContent(page, limit, tag) {
  return fetchWorkContent()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}

export function slugToWorkContent(workContents) {
  const hash = {};
  workContents.forEach((it) => {
    hash[it.slug] = it;
  });
  return hash;
}

export async function composedWorkContent() {
  const work = fetchWorkContent();
  return Promise.all(
    work.map((item) => {
      const { slug } = item;
      const source = fs.readFileSync(
        slugToWorkContent(work)[slug].fullPath,
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
