import read from './read.js';

export default async function readJSON(path) {
  const content = await read(path);
  return JSON.parse(content);
}
