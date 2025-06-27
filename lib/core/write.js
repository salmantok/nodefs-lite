import { writeFile } from 'fs/promises';

export default async function write(path, content) {
  await writeFile(path, content, 'utf-8');
}
