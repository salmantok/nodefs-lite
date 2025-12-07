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
console.log('[readFileSync] isi file:', fs.readFileSync('hello.txt', 'utf8'));
```

## API

### `accessSync(path)` / `access(path)`

```js
console.log('[accessSync] cek file.txt');
fs.accessSync('file.txt');
```

```js
console.log('[access] cek file.txt');
await fs.access('file.txt');
```

### `appendFileSync(path, data)` / `appendFile(path, data)`

```js
console.log('[appendFileSync] tambah teks ke file.txt');
fs.appendFileSync('file.txt', 'Hello\n');
```

```js
console.log('[appendFile] tambah teks ke file.txt');
await fs.appendFile('file.txt', 'Hello\n');
```

### `chmodSync(path, mode)` / `chmod(path, mode)`

```js
console.log('[chmodSync] ubah izin script.sh menjadi 755');
fs.chmodSync('script.sh', 0o755);
```

```js
console.log('[chmod] ubah izin script.sh menjadi 755');
await fs.chmod('script.sh', 0o755);
```

### `chownSync(path, uid, gid)` / `chown(path, uid, gid)`

```js
console.log('[chownSync] ubah owner file.txt');
fs.chownSync('file.txt', 1000, 1000);
```

```js
console.log('[chown] ubah owner file.txt');
await fs.chown('file.txt', 1000, 1000);
```

### `cpSync(src, dest)` / `cp(src, dest)`

```js
console.log('[cpSync] salin a.txt -> backup/a.txt');
fs.cpSync('a.txt', 'backup/a.txt');
```

```js
console.log('[cp] salin a.txt -> backup/a.txt');
await fs.cp('a.txt', 'backup/a.txt');
```

### `existsSync(path)` / `exists(path)`

```js
console.log('[existsSync] cek config.json:', fs.existsSync('config.json'));
```

```js
console.log('[exists] cek config.json:', await fs.exists('config.json'));
```

### `lstatSync(path)` / `lstat(path)`

```js
const info = fs.lstatSync('file.txt');
console.log('[lstatSync] info:', info.isFileSync());
```

```js
const info = await fs.lstat('file.txt');
console.log('[lstat] info:', info.isFile());
```

### `mkdirSync(path, { recursive })` / `mkdir(path, { recursive })`

```js
console.log('[mkdirSync] buat folder a/b/c');
fs.mkdirSync('a/b/c', { recursive: true });
```

```js
console.log('[mkdir] buat folder a/b/c');
await fs.mkdir('a/b/c', { recursive: true });
```

### `mkdtempSync(prefix)` / `mkdtemp(prefix)`

```js
console.log('[mkdtempSync] buat folder tmp');
fs.mkdtempSync('tmp-');
```

```js
console.log('[mkdtemp] buat folder tmp');
await fs.mkdtemp('tmp-');
```

### `readdirSync(dir)` / `readdir(dir)`

```js
console.log('[readdirSync] list folder:', fs.readdirSync('./'));
```

```js
console.log('[readdir] list folder:', await fs.readdir('./'));
```

### `readFileSync(path, encoding)` / `readFile(path, encoding)`

```js
console.log('[readFileSync] isi:', fs.readFileSync('file.txt', 'utf8'));
```

```js
console.log('[readFile] isi:', await fs.readFile('file.txt', 'utf8'));
```

### `readlinkSync(path)` / `readlink(path)`

```js
console.log('[readlinkSync] ->', fs.readlinkSync('symlink'));
```

```js
console.log('[readlink] ->', await fs.readlink('symlink'));
```

### `realpathSync(path)` / `realpath(path)`

```js
console.log('[realpathSync] ->', fs.realpathSync('./'));
```

```js
console.log('[realpath] ->', await fs.realpath('./'));
```

### `renameSync(old, new)` / `rename(old, new)`

```js
console.log('[renameSync] a.txt -> b.txt');
fs.renameSync('a.txt', 'b.txt');
```

```js
console.log('[rename] a.txt -> b.txt');
await fs.rename('a.txt', 'b.txt');
```

### `rmSync(path, { recursive })` / `rm(path, { recursive })`

```js
console.log('[rmSync] hapus dir');
fs.rmSync('dir', { recursive: true, force: true });
```

```js
console.log('[rm] hapus dist');
await fs.rm('dist', { recursive: true, force: true });
```

### `rmdirSync(path)` / `rmdir(path)`

```js
console.log('[rmdirSync] hapus folder kosong');
fs.rmdirSync('empty');
```

```js
console.log('[rmdir] hapus folder kosong');
await fs.rmdir('empty');
```

### `statSync(path)` / `stat(path)`

```js
console.log('[statSync]', fs.statSync('file.txt'));
```

```js
console.log('[stat]', await fs.stat('file.txt'));
```

### `symlinkSync(target, path)` / `symlink(target, path)`

```js
console.log('[symlinkSync] buat symlink');
fs.symlinkSync('src.txt', 'link.txt');
```

```js
console.log('[symlink] buat symlink');
await fs.symlink('src.txt', 'link.txt');
```

### `truncateSync(path)` / `truncate(path)`

```js
console.log('[truncateSync] kosongkan file.txt');
fs.truncateSync('file.txt', 0);
```

```js
console.log('[truncate] kosongkan file.txt');
await fs.truncate('file.txt', 0);
```

### `unlinkSync(path)` / `unlink(path)`

```js
console.log('[unlinkSync] hapus temp.txt');
fs.unlinkSync('temp.txt');
```

```js
console.log('[unlink] hapus temp.txt');
await fs.unlink('temp.txt');
```

### `utimesSync(path, atime, mtime)` / `utimes(path, atime, mtime)`

```js
console.log('[utimesSync] update times');
fs.utimesSync('file.txt', new Date(), new Date());
```

```js
console.log('[utimes] update times');
await fs.utimes('file.txt', new Date(), new Date());
```

### `writeFileSync(path, data)` / `writeFile(path, data)`

```js
console.log('[writeFileSync] tulis file a.txt');
fs.writeFileSync('a.txt', 'Hello');
```

```js
console.log('[writeFile] tulis file a.txt');
await fs.writeFile('a.txt', 'Hello');
```

### `createReadStream(path)`

```js
console.log('[createReadStream] streaming bigfile.txt');
const stream = fs.createReadStream('bigfile.txt');
stream.pipe(process.stdout);
```

### `createWriteStream(path)`

```js
console.log('[createWriteStream] tulis ke out.txt');
const out = fs.createWriteStream('out.txt');
out.write('Hello!');
```

### `constants`

```js
console.log('[constants]', fs.constants.O_RDWR);
```

### `isFileSync(path)` / `isFile(path)`

```js
console.log('[isFileSync]', fs.isFileSync('image.png'));
```

```js
console.log('[isFile]', await fs.isFile('image.png'));
```

### `isDirSync(path)` / `isDir(path)`

```js
console.log('[isDirSync]', fs.isDirSync('node_modules'));
```

```js
console.log('[isDir]', await fs.isDir('node_modules'));
```

### `ensureDirSync(path)` / `ensureDir(path)`

```js
console.log('[ensureDirSync] pastikan folder logs/data ada');
fs.ensureDirSync('logs/data');
```

```js
console.log('[ensureDir] pastikan folder logs/data ada');
await fs.ensureDir('logs/data');
```

### `ensureFileSync(path)` / `ensureFile(path)`

```js
console.log('[ensureFileSync] buat file jika belum ada');
fs.ensureFileSync('data/config/app.json');
```

```js
console.log('[ensureFile] buat file jika belum ada');
await fs.ensureFile('data/config/app.json');
```

### `ensureEmptyDirSync(path)` / `ensureEmptyDir(path)`

```js
console.log('[ensureEmptyDirSync] pastikan kosong');
fs.ensureEmptyDirSync('cache');
```

```js
console.log('[ensureEmptyDir] pastikan kosong');
await fs.ensureEmptyDir('cache');
```

### `emptyDirSync(path)` / `emptyDir(path)`

```js
console.log('[emptyDirSync] kosongkan folder tmp');
fs.emptyDirSync('tmp');
```

```js
console.log('[emptyDir] kosongkan folder tmp');
await fs.emptyDir('tmp');
```

### `readJsonSync(path)` / `readJson(path)`

```js
const data = fs.readJsonSync('config.json');
console.log('[readJsonSync]', data);
```

```js
const data = await fs.readJson('config.json');
console.log('[readJson]', data);
```

### `writeJsonSync(path, data)` / `writeJson(path, data)`

```js
console.log('[writeJsonSync] tulis config.json');
fs.writeJsonSync('config.json', { name: 'app', version: '0.0.0' });
```

```js
console.log('[writeJson] tulis config.json');
await fs.writeJson('config.json', { name: 'app', version: '0.0.0' });
```
