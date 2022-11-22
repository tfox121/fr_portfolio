import tags from '../../meta/tags.yml';

const tagMap = generateTagMap();

function generateTagMap() {
  const result = {};

  tags.tags.forEach((tag) => {
    result[tag.slug] = tag;
  });
  return result;
}

export function getTag(slug) {
  return tagMap[slug];
}

export function listTags() {
  return tags.tags;
}
