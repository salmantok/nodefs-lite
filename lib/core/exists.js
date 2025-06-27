import { access } from 'fs/promises';
import { constants } from 'fs';

export default async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
