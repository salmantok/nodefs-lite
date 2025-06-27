import { readFile } from 'fs/promises';

export default async function read(path) {
  return await readFile(path, 'utf-8');
}
