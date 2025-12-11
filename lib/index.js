import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

// ============================================================================
// GRACEFUL ENGINE
// ============================================================================
// Error yang perlu retry
const RETRY_CODES = new Set(['EMFILE', 'ENFILE', 'EBUSY']);

// Batas operasi paralel
const MAX_CONCURRENT = 64;
let activeCount = 0;
const taskQueue = [];

// Mengantri task
function runTaskQueue() {
    if (activeCount >= MAX_CONCURRENT) return;
    const next = taskQueue.shift();
    if (!next) return;

    activeCount++;
    next().finally(() => {
        activeCount--;
        runTaskQueue();
    });
}

function enqueue(task) {
    return new Promise((resolve, reject) => {
        taskQueue.push(() => task().then(resolve).catch(reject));
        runTaskQueue();
    });
}

// ============================================================================
// GRACEFUL FOR SYNC
// ============================================================================

function gracefulSync(fn, ...args) {
    let retry = 0;
    const maxRetry = 10;

    while (true) {
        try {
            return fn(...args);
        } catch (err) {
            if (RETRY_CODES.has(err.code) && retry < maxRetry) {
                retry++;
                // 50ms * retry — blocking sleep (safe untuk sync only)
                const wait = 50 * retry;
                const end = Date.now() + wait;
                while (Date.now() < end) {} // blocking
            } else {
                throw err;
            }
        }
    }
}

// ============================================================================
// GRACEFUL FOR ASYNC
// ============================================================================

function gracefulAsync(fn, ...args) {
    return enqueue(async () => {
        let retry = 0;
        const maxRetry = 10;

        while (true) {
            try {
                return await fn(...args);
            } catch (err) {
                if (RETRY_CODES.has(err.code) && retry < maxRetry) {
                    retry++;
                    await new Promise((r) => setTimeout(r, 50 * retry));
                } else {
                    throw err;
                }
            }
        }
    });
}

// ============================================================================
// nodeFsLite API
// ============================================================================

const nodeFsLite = {
    // ----------------------------------------------------
    // SYNC METHODS (dipatch ke gracefulSync)
    // ----------------------------------------------------
    accessSync: (...a) => gracefulSync(fs.accessSync, ...a),
    appendFileSync: (...a) => gracefulSync(fs.appendFileSync, ...a),
    chmodSync: (...a) => gracefulSync(fs.chmodSync, ...a),
    chownSync: (...a) => gracefulSync(fs.chownSync, ...a),
    cpSync: (...a) => gracefulSync(fs.cpSync, ...a),
    existsSync: fs.existsSync, // aman
    lstatSync: (...a) => gracefulSync(fs.lstatSync, ...a),
    mkdirSync: (...a) => gracefulSync(fs.mkdirSync, ...a),
    mkdtempSync: (...a) => gracefulSync(fs.mkdtempSync, ...a),
    readdirSync: (...a) => gracefulSync(fs.readdirSync, ...a),
    readFileSync: (...a) => gracefulSync(fs.readFileSync, ...a),
    readlinkSync: (...a) => gracefulSync(fs.readlinkSync, ...a),
    realpathSync: (...a) => gracefulSync(fs.realpathSync, ...a),
    renameSync: (...a) => gracefulSync(fs.renameSync, ...a),
    rmSync: (...a) => gracefulSync(fs.rmSync, ...a),
    rmdirSync: (...a) => gracefulSync(fs.rmdirSync, ...a),
    statSync: (...a) => gracefulSync(fs.statSync, ...a),
    symlinkSync: (...a) => gracefulSync(fs.symlinkSync, ...a),
    truncateSync: (...a) => gracefulSync(fs.truncateSync, ...a),
    unlinkSync: (...a) => gracefulSync(fs.unlinkSync, ...a),
    utimesSync: (...a) => gracefulSync(fs.utimesSync, ...a),
    writeFileSync: (...a) => gracefulSync(fs.writeFileSync, ...a),

    // ----------------------------------------------------
    // ASYNC METHODS (dipatch ke gracefulAsync + queue)
    // ----------------------------------------------------
    access: (...a) => gracefulAsync(fsPromises.access, ...a),
    appendFile: (...a) => gracefulAsync(fsPromises.appendFile, ...a),
    chmod: (...a) => gracefulAsync(fsPromises.chmod, ...a),
    chown: (...a) => gracefulAsync(fsPromises.chown, ...a),
    cp: (...a) => gracefulAsync(fsPromises.cp, ...a),
    lstat: (...a) => gracefulAsync(fsPromises.lstat, ...a),
    mkdir: (...a) => gracefulAsync(fsPromises.mkdir, ...a),
    mkdtemp: (...a) => gracefulAsync(fsPromises.mkdtemp, ...a),
    readdir: (...a) => gracefulAsync(fsPromises.readdir, ...a),
    readFile: (...a) => gracefulAsync(fsPromises.readFile, ...a),
    readlink: (...a) => gracefulAsync(fsPromises.readlink, ...a),
    realpath: (...a) => gracefulAsync(fsPromises.realpath, ...a),
    rename: (...a) => gracefulAsync(fsPromises.rename, ...a),
    rm: (...a) => gracefulAsync(fsPromises.rm, ...a),
    rmdir: (...a) => gracefulAsync(fsPromises.rmdir, ...a),
    stat: (...a) => gracefulAsync(fsPromises.stat, ...a),
    symlink: (...a) => gracefulAsync(fsPromises.symlink, ...a),
    truncate: (...a) => gracefulAsync(fsPromises.truncate, ...a),
    unlink: (...a) => gracefulAsync(fsPromises.unlink, ...a),
    utimes: (...a) => gracefulAsync(fsPromises.utimes, ...a),
    writeFile: (...a) => gracefulAsync(fsPromises.writeFile, ...a),

    // STREAM (tidak butuh graceful)
    createReadStream: fs.createReadStream,
    createWriteStream: fs.createWriteStream,

    constants: fs.constants,

    // ---------- SYNC HELPERS ----------
    isFileSync(p) {
        try {
            return gracefulSync(fs.lstatSync, p).isFile();
        } catch {
            return false;
        }
    },

    isDirSync(p) {
        try {
            return gracefulSync(fs.lstatSync, p).isDirectory();
        } catch {
            return false;
        }
    },

    ensureDirSync(p) {
        return gracefulSync(fs.mkdirSync, p, { recursive: true });
    },

    ensureFileSync(p) {
        const dir = path.dirname(p);
        this.ensureDirSync(dir);

        if (!fs.existsSync(p)) {
            gracefulSync(fs.writeFileSync, p, '');
        }
        return p;
    },

    readJsonSync(p) {
        return JSON.parse(gracefulSync(fs.readFileSync, p, 'utf8'));
    },

    writeJsonSync(p, data, space = 2) {
        this.ensureFileSync(p);
        gracefulSync(fs.writeFileSync, p, JSON.stringify(data, null, space));
        return true;
    },

    // ---------- ASYNC HELPERS ----------
    async isFile(p) {
        try {
            return (await gracefulAsync(fsPromises.lstat, p)).isFile();
        } catch {
            return false;
        }
    },

    async isDir(p) {
        try {
            return (await gracefulAsync(fsPromises.lstat, p)).isDirectory();
        } catch {
            return false;
        }
    },

    async ensureDir(p) {
        await gracefulAsync(fsPromises.mkdir, p, { recursive: true });
        return p;
    },

    async ensureFile(p) {
        const dir = path.dirname(p);
        await this.ensureDir(dir);

        if (!(await this.exists(p))) {
            await gracefulAsync(fsPromises.writeFile, p, '');
        }
        return p;
    },

    async exists(p) {
        try {
            await gracefulAsync(fsPromises.access, p);
            return true;
        } catch {
            return false;
        }
    },

    async readJson(p) {
        return JSON.parse(await gracefulAsync(fsPromises.readFile, p, 'utf8'));
    },

    async writeJson(p, data, space = 2) {
        await this.ensureFile(p);
        await gracefulAsync(
            fsPromises.writeFile,
            p,
            JSON.stringify(data, null, space)
        );
        return true;
    },
};

export default nodeFsLite;
