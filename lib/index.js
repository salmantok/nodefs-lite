import fs from 'fs/promises';
import fscore from 'fs';
import path from 'path';

const nodeFsLite = {
    // ----------------------------------------------------
    // NATIVE FS METHODS
    // ----------------------------------------------------
    access: fs.access,
    copyFile: fs.copyFile,
    cp: fs.cp,
    open: fs.open,
    opendir: fs.opendir,
    rename: fs.rename,
    truncate: fs.truncate,
    rm: fs.rm,
    rmdir: fs.rmdir,
    mkdir: fs.mkdir,
    readdir: fs.readdir,
    readlink: fs.readlink,
    symlink: fs.symlink,
    lstat: fs.lstat,
    stat: fs.stat,
    statfs: fs.statfs,
    link: fs.link,
    unlink: fs.unlink,
    chmod: fs.chmod,
    chown: fs.chown,
    utimes: fs.utimes,
    lutimes: fs.lutimes,
    realpath: fs.realpath,
    mkdtemp: fs.mkdtemp,
    writeFile: fs.writeFile,
    appendFile: fs.appendFile,
    readFile: fs.readFile,

    watch: fscore.watch,
    constants: fscore.constants,
    createReadStream: fscore.createReadStream,
    createWriteStream: fscore.createWriteStream,

    // ----------------------------------------------------
    // MODERN HELPERS
    // ----------------------------------------------------

    async exists(p) {
        try {
            await fs.access(p);
            return true;
        } catch {
            return false;
        }
    },

    async isFile(p) {
        try {
            const s = await fs.lstat(p);
            return s.isFile();
        } catch {
            return false;
        }
    },

    async isDir(p) {
        try {
            const s = await fs.lstat(p);
            return s.isDirectory();
        } catch {
            return false;
        }
    },

    async ensureFile(p) {
        const dir = path.dirname(p);
        await this.ensureDir(dir);

        if (!(await this.exists(p))) {
            await fs.writeFile(p, '');
        }

        return p;
    },

    async ensureDir(p) {
        await fs.mkdir(p, { recursive: true });
        return p;
    },

    async ensureEmptyDir(p) {
        await fs.rm(p, { recursive: true, force: true });
        await fs.mkdir(p, { recursive: true });
        return p;
    },

    async emptyDir(p) {
        if (!(await this.exists(p))) return this.ensureDir(p);

        const list = await fs.readdir(p);
        for (const item of list) {
            const full = path.join(p, item);
            await fs.rm(full, { recursive: true, force: true });
        }
        return p;
    },

    async fileExt(p) {
        return path.extname(p);
    },

    async fileName(p) {
        return path.basename(p);
    },

    async readJson(p) {
        const txt = await fs.readFile(p, 'utf8');
        return JSON.parse(txt);
    },

    async writeJson(p, data, space = 2) {
        await this.ensureFile(p);
        const txt = JSON.stringify(data, null, space);
        await fs.writeFile(p, txt);
        return true;
    },
};

export default nodeFsLite;
