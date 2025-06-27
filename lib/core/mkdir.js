import { mkdir } from 'fs/promises';

export default async function makeDir(path) {
  await mkdir(path, { recursive: true });
}
