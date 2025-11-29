import fs from 'fs/promises';
import fscore from 'fs';
import path, { dirname } from 'path';

/* ----------------------------------------------------
 * Basic Helpers
 * ---------------------------------------------------- */
async function exists(p) {
    try {
        await fs.stat(p);
        return true;
    } catch {
        return false;
    }
}

async function ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true });
}

async function ensureFile(file) {
    await ensureDir(dirname(file));
    if (!(await exists(file))) {
        await fs.writeFile(file, '');
    }
}

async function ensureEmptyDir(dir) {
    await fs.rm(dir, { recursive: true, force: true });
    await fs.mkdir(dir, { recursive: true });
}

/* ----------------------------------------------------
 * File Operations
 * ---------------------------------------------------- */
function readFile(p, encoding = 'utf8') {
    return fs.readFile(p, encoding);
}

async function writeFile(p, data, encoding = 'utf8') {
    await ensureDir(dirname(p));
    return fs.writeFile(p, data, encoding);
}

function appendFile(p, data, encoding = 'utf8') {
    return fs.appendFile(p, data, encoding);
}

async function remove(p) {
    await fs.rm(p, { recursive: true, force: true });
}

async function rename(oldPath, newPath) {
    await ensureDir(dirname(newPath));
    return fs.rename(oldPath, newPath);
}

async function move(src, dest) {
    await ensureDir(dirname(dest));
    return fs.rename(src, dest);
}

async function copy(src, dest) {
    await ensureDir(dirname(dest));
    return fs.copyFile(src, dest);
}

/* ----------------------------------------------------
 * Directory
 * ---------------------------------------------------- */
function readDir(dir) {
    return fs.readdir(dir);
}

async function emptyDir(dir) {
    if (!(await exists(dir))) return ensureDir(dir);
    const files = await fs.readdir(dir);
    for (const file of files) {
        await remove(path.join(dir, file));
    }
}

/* ----------------------------------------------------
 * JSON Helpers
 * ---------------------------------------------------- */
async function readJSON(p) {
    const content = await fs.readFile(p, 'utf8');
    return JSON.parse(content);
}

async function writeJSON(p, obj) {
    await ensureDir(dirname(p));
    return fs.writeFile(p, JSON.stringify(obj, null, 2));
}

/* ----------------------------------------------------
 * Info utilities
 * ---------------------------------------------------- */
function stat(p) {
    return fs.stat(p);
}

async function isFile(p) {
    try {
        return (await fs.stat(p)).isFile();
    } catch {
        return false;
    }
}

async function isDir(p) {
    try {
        return (await fs.stat(p)).isDirectory();
    } catch {
        return false;
    }
}

async function size(p) {
    const s = await fs.stat(p);
    return s.size;
}

function fileExt(p) {
    return path.extname(p);
}

function fileName(p) {
    return path.basename(p);
}

/* ----------------------------------------------------
 * Stream helpers
 * ---------------------------------------------------- */
function createReadStream(p) {
    return fscore.createReadStream(p);
}

function createWriteStream(p) {
    return fscore.createWriteStream(p);
}

/* ----------------------------------------------------
 * DEFAULT EXPORT
 * ---------------------------------------------------- */
export default {
    exists,
    ensureDir,
    ensureFile,
    ensureEmptyDir,
    readFile,
    writeFile,
    appendFile,
    remove,
    rename,
    move,
    copy,
    readDir,
    emptyDir,
    readJSON,
    writeJSON,
    stat,
    isFile,
    isDir,
    size,
    fileExt,
    fileName,
    createReadStream,
    createWriteStream,
};
