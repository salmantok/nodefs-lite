import copy from './core/copy.js';
import ensureFile from './core/ensureFile.js';
import exists from './core/exists.js';
import mkdir from './core/mkdir.js';
import move from './core/move.js';
import read from './core/read.js';
import readJSON from './core/readJSON.js';
import remove from './core/remove.js';
import write from './core/write.js';
import writeJSON from './core/writeJSON.js';

export {
  copy,
  ensureFile,
  exists,
  mkdir,
  move,
  read,
  readJSON,
  remove,
  write,
  writeJSON,
};

export const fs = {
  copy,
  ensureFile,
  exists,
  mkdir,
  move,
  read,
  readJSON,
  remove,
  write,
  writeJSON,
};

export default fs;
