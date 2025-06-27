import { writeFile } from 'fs/promises';

export default async function writeJSON(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
}
