import { dirname } from 'path';
import { writeFile } from 'fs/promises';
import mkdir from './mkdir.js';

export default async function ensureFile(path) {
  await mkdir(dirname(path));
  try {
    await writeFile(path, '', { flag: 'a' });
  } catch {}
}
