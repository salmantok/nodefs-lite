import { cp } from 'fs/promises';

export default async function copy(src, dest) {
  await cp(src, dest, { recursive: true });
}
