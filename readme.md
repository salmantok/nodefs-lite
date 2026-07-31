# nodefs-lite

> `nodefs-lite` utilitas filesystem yang menyediakan API stabil berbasis `fs` dan `fs/promises` tanpa modifikasi, namun dengan tambahan helper modern untuk memudahkan banyak tugas umum.

📦 **Ringan** — hanya membungkus fungsi `fs` asli

⚡ **Cepat** — tanpa overhead tambahan

🔧 **Modular** — dapat di‐tree-shake

👌 **Mudah digunakan** — API seragam dan modern

## Instalasi

```sh
npm install nodefs-lite
```

## Penggunaan Dasar

```js
import fs from 'nodefs-lite';

await fs.writeFile('hello.txt', 'Hello World!');

const text = fs.readFileSync('hello.txt', 'utf8');
console.log(text);
```

## API

### `accessSync(path)` / `access(path)`

```js
fs.accessSync('file.txt');
```

```js
await fs.access('file.txt');
```

### `appendFileSync(path, data)` / `appendFile(path, data)`

```js
fs.appendFileSync('file.txt', 'Hello\n');
```

```js
await fs.appendFile('file.txt', 'Hello\n');
```

### `chmodSync(path, mode)` / `chmod(path, mode)`

```js
fs.chmodSync('script.sh', 0o755);
```

```js
await fs.chmod('script.sh', 0o755);
```

### `chownSync(path, uid, gid)` / `chown(path, uid, gid)`

```js
fs.chownSync('file.txt', 1000, 1000);
```

```js
await fs.chown('file.txt', 1000, 1000);
```

### `cpSync(src, dest)` / `cp(src, dest)`

```js
fs.cpSync('a.txt', 'backup/a.txt');
```

```js
await fs.cp('a.txt', 'backup/a.txt');
```

### `existsSync(path)` / `exists(path)`

```js
console.log(fs.existsSync('config.json'));
```

```js
console.log(await fs.exists('config.json'));
```

### `lstatSync(path)` / `lstat(path)`

```js
const stats = fs.lstatSync('file.txt');

console.log(stats.isFile());
```

```js
const stats = await fs.lstat('file.txt');

console.log(stats.isFile());
```

### `mkdirSync(path, options)` / `mkdir(path, options)`

```js
fs.mkdirSync('a/b/c', { recursive: true });
```

```js
await fs.mkdir('a/b/c', { recursive: true });
```

### `mkdtempSync(prefix)` / `mkdtemp(prefix)`

```js
const dir = fs.mkdtempSync('tmp-');

console.log(dir);
```

```js
const dir = await fs.mkdtemp('tmp-');

console.log(dir);
```

### `readdirSync(path)` / `readdir(path)`

```js
console.log(fs.readdirSync('.'));
```

```js
console.log(await fs.readdir('.'));
```

### `readFileSync(path, encoding)` / `readFile(path, encoding)`

```js
console.log(fs.readFileSync('file.txt', 'utf8'));
```

```js
console.log(await fs.readFile('file.txt', 'utf8'));
```

### `readlinkSync(path)` / `readlink(path)`

```js
console.log(fs.readlinkSync('symlink'));
```

```js
console.log(await fs.readlink('symlink'));
```

### `realpathSync(path)` / `realpath(path)`

```js
console.log(fs.realpathSync('.'));
```

```js
console.log(await fs.realpath('.'));
```

### `renameSync(oldPath, newPath)` / `rename(oldPath, newPath)`

```js
fs.renameSync('a.txt', 'b.txt');
```

```js
await fs.rename('a.txt', 'b.txt');
```

### `rmSync(path, options)` / `rm(path, options)`

```js
fs.rmSync('dist', { recursive: true, force: true });
```

```js
await fs.rm('dist', { recursive: true, force: true });
```

### `rmdirSync(path)` / `rmdir(path)`

```js
fs.rmdirSync('empty');
```

```js
await fs.rmdir('empty');
```

### `statSync(path)` / `stat(path)`

```js
console.log(fs.statSync('file.txt'));
```

```js
console.log(await fs.stat('file.txt'));
```

### `symlinkSync(target, path)` / `symlink(target, path)`

```js
fs.symlinkSync('src.txt', 'link.txt');
```

```js
await fs.symlink('src.txt', 'link.txt');
```

### `truncateSync(path, len)` / `truncate(path, len)`

```js
fs.truncateSync('file.txt', 0);
```

```js
await fs.truncate('file.txt', 0);
```

### `unlinkSync(path)` / `unlink(path)`

```js
fs.unlinkSync('temp.txt');
```

```js
await fs.unlink('temp.txt');
```

### `utimesSync(path, atime, mtime)` / `utimes(path, atime, mtime)`

```js
fs.utimesSync('file.txt', new Date(), new Date());
```

```js
await fs.utimes('file.txt', new Date(), new Date());
```

### `writeFileSync(path, data)` / `writeFile(path, data)`

```js
fs.writeFileSync('a.txt', 'Hello');
```

```js
await fs.writeFile('a.txt', 'Hello');
```

### `createReadStream(path)`

```js
const stream = fs.createReadStream('bigfile.txt');

stream.pipe(process.stdout);
```

### `createWriteStream(path)`

```js
const stream = fs.createWriteStream('out.txt');

stream.write('Hello!');
stream.end();
```

### `constants`

```js
console.log(fs.constants.O_RDWR);
```

### `isFileSync(path)` / `isFile(path)`

```js
console.log(fs.isFileSync('image.png'));
```

```js
console.log(await fs.isFile('image.png'));
```

### `isDirSync(path)` / `isDir(path)`

```js
console.log(fs.isDirSync('node_modules'));
```

```js
console.log(await fs.isDir('node_modules'));
```

### `ensureDirSync(path)` / `ensureDir(path)`

```js
fs.ensureDirSync('logs/data');
```

```js
await fs.ensureDir('logs/data');
```

### `ensureFileSync(path)` / `ensureFile(path)`

```js
fs.ensureFileSync('data/config/app.json');
```

```js
await fs.ensureFile('data/config/app.json');
```

### `ensureEmptyDirSync(path)` / `ensureEmptyDir(path)`

```js
fs.ensureEmptyDirSync('cache');
```

```js
await fs.ensureEmptyDir('cache');
```

### `emptyDirSync(path)` / `emptyDir(path)`

```js
fs.emptyDirSync('tmp');
```

```js
await fs.emptyDir('tmp');
```

### `readJsonSync(path)` / `readJson(path)`

```js
const data = fs.readJsonSync('config.json');

console.log(data);
```

```js
const data = await fs.readJson('config.json');

console.log(data);
```

### `writeJsonSync(path, data)` / `writeJson(path, data)`

```js
fs.writeJsonSync('config.json', {
    name: 'app',
    version: '0.0.0',
});
```

```js
await fs.writeJson('config.json', {
    name: 'app',
    version: '0.0.0',
});
```
