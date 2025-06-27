import { rm } from 'fs/promises';

export default async function remove(path) {
  await rm(path, { recursive: true, force: true });
}
