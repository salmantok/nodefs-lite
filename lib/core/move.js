import { rename } from 'fs/promises';

export default async function move(src, dest) {
  await rename(src, dest);
}
