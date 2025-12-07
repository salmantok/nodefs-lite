import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const nodeFsLite = {
    // ----------------------------------------------------
    // STABLE SYNC METHODS
    // ----------------------------------------------------
    accessSync: fs.accessSync,
    appendFileSync: fs.appendFileSync,
    chmodSync: fs.chmodSync,
    chownSync: fs.chownSync,
    cpSync: fs.cpSync,
    existsSync: fs.existsSync,
    lstatSync: fs.lstatSync,
    mkdirSync: fs.mkdirSync,
    mkdtempSync: fs.mkdtempSync,
    readdirSync: fs.readdirSync,
    readFileSync: fs.readFileSync,
    readlinkSync: fs.readlinkSync,
    realpathSync: fs.realpathSync,
    renameSync: fs.renameSync,
    rmSync: fs.rmSync,
    rmdirSync: fs.rmdirSync, // masih stabil meski disarankan: rm
    statSync: fs.statSync,
    symlinkSync: fs.symlinkSync,
    truncateSync: fs.truncateSync,
    unlinkSync: fs.unlinkSync,
    utimesSync: fs.utimesSync,
    writeFileSync: fs.writeFileSync,

    // ----------------------------------------------------
    // STABLE PROMISE METHODS
    // ----------------------------------------------------
    access: fsPromises.access,
    appendFile: fsPromises.appendFile,
    chmod: fsPromises.chmod,
    chown: fsPromises.chown,
    cp: fsPromises.cp,
    lstat: fsPromises.lstat,
    mkdir: fsPromises.mkdir,
    mkdtemp: fsPromises.mkdtemp,
    readdir: fsPromises.readdir,
    readFile: fsPromises.readFile,
    readlink: fsPromises.readlink,
    realpath: fsPromises.realpath,
    rename: fsPromises.rename,
    rm: fsPromises.rm,
    rmdir: fsPromises.rmdir,
    stat: fsPromises.stat,
    symlink: fsPromises.symlink,
    truncate: fsPromises.truncate,
    unlink: fsPromises.unlink,
    utimes: fsPromises.utimes,
    writeFile: fsPromises.writeFile,

    // ----------------------------------------------------
    // STREAMS (HANYA YANG STABIL)
    // ----------------------------------------------------
    createReadStream: fs.createReadStream,
    createWriteStream: fs.createWriteStream,

    constants: fs.constants,

    // ----------------------------------------------------
    // MODERN HELPERS
    // ----------------------------------------------------

    // ================================
    //  SYNC HELPERS
    // ================================

    /*existsSync(p) {
        try {
            fs.accessSync(p);
            return true;
        } catch {
            return false;
        }
    },*/

    isFileSync(p) {
        try {
            return fs.lstatSync(p).isFile();
        } catch {
            return false;
        }
    },

    isDirSync(p) {
        try {
            return fs.lstatSync(p).isDirectory();
        } catch {
            return false;
        }
    },

    ensureDirSync(p) {
        fs.mkdirSync(p, { recursive: true });
        return p;
    },

    ensureFileSync(p) {
        const dir = path.dirname(p);
        this.ensureDirSync(dir);

        if (!this.existsSync(p)) {
            fs.writeFileSync(p, '');
        }
        return p;
    },

    ensureEmptyDirSync(p) {
        fs.rmSync(p, { recursive: true, force: true });
        fs.mkdirSync(p, { recursive: true });
        return p;
    },

    emptyDirSync(p) {
        if (!this.existsSync(p)) {
            return this.ensureDirSync(p);
        }

        const files = fs.readdirSync(p);
        for (const file of files) {
            fs.rmSync(path.join(p, file), { recursive: true, force: true });
        }
        return p;
    },

    readJsonSync(p) {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
    },

    writeJsonSync(p, data, space = 2) {
        this.ensureFileSync(p);
        fs.writeFileSync(p, JSON.stringify(data, null, space));
        return true;
    },

    // ================================
    //  ASYNC HELPERS
    // ================================

    async exists(p) {
        try {
            await fsPromises.access(p);
            return true;
        } catch {
            return false;
        }
    },

    async isFile(p) {
        try {
            return (await fsPromises.lstat(p)).isFile();
        } catch {
            return false;
        }
    },

    async isDir(p) {
        try {
            return (await fsPromises.lstat(p)).isDirectory();
        } catch {
            return false;
        }
    },

    async ensureDir(p) {
        await fsPromises.mkdir(p, { recursive: true });
        return p;
    },

    async ensureFile(p) {
        const dir = path.dirname(p);
        await this.ensureDir(dir);

        if (!(await this.exists(p))) {
            await fsPromises.writeFile(p, '');
        }
        return p;
    },

    async ensureEmptyDir(p) {
        await fsPromises.rm(p, { recursive: true, force: true });
        await fsPromises.mkdir(p, { recursive: true });
        return p;
    },

    async emptyDir(p) {
        if (!(await this.exists(p))) {
            return this.ensureDir(p);
        }
        const items = await fsPromises.readdir(p);
        for (const name of items) {
            await fsPromises.rm(path.join(p, name), {
                recursive: true,
                force: true,
            });
        }
        return p;
    },

    async readJson(p) {
        return JSON.parse(await fsPromises.readFile(p, 'utf8'));
    },

    async writeJson(p, data, space = 2) {
        await this.ensureFile(p);
        await fsPromises.writeFile(p, JSON.stringify(data, null, space));
        return true;
    },
};

export default nodeFsLite;
