# nodefs-lite

> Utilitas File System Node.js

_`nodefs-lite` adalah modul utilitas file system yang memberikan API ringkas untuk operasi dasar file dan folder._

## Instalasi

```sh
npm install nodefs-lite
```

## Penggunaan

```js
import fs from 'nodefs-lite';

await fs.writeFile('data.txt', 'Hello World!');
```

# 1) **ALL FS METHODS** (bawaan Node.js)

## `access(path)`

```js
await fs.access('data.txt');
```

## `copyFile(src, dest)`

```js
await fs.copyFile('a.txt', 'b.txt');
```

## `cp(src, dest, options)`

```js
await fs.cp('src', 'dist', { recursive: true });
```

## `open(path, mode)`

```js
const f = await fs.open('log.txt', 'a');
await f.write('Hello\n');
await f.close();
```

## `opendir(path)`

```js
const dir = await fs.opendir('./src');
for await (const entry of dir) {
    console.log(entry.name);
}
```

## `rename(oldPath, newPath)`

```js
await fs.rename('old.txt', 'new.txt');
```

## `truncate(path)`

```js
await fs.truncate('data.txt');
```

## `rm(path, options)`

```js
await fs.rm('temp', { recursive: true, force: true });
```

## `rmdir(path)`

```js
await fs.rmdir('empty-dir');
```

## `mkdir(path)`

```js
await fs.mkdir('new-folder');
```

## `readdir(path)`

```js
const files = await fs.readdir('./');
console.log(files);
```

## `readlink(path)`

```js
console.log(await fs.readlink('symlink.lnk'));
```

## `symlink(target, path)`

```js
await fs.symlink('real-file.txt', 'alias.txt');
```

## `lstat(path)`

## `stat(path)`

```js
const info = await fs.stat('a.txt');
console.log(info.isFile(), info.size);
```

## `statfs(path)`

```js
console.log(await fs.statfs('/'));
```

## `link(existing, newPath)`

```js
await fs.link('a.txt', 'a-hardlink.txt');
```

## `unlink(path)`

```js
await fs.unlink('temp.txt');
```

## `chmod(path, mode)`

```js
await fs.chmod('script.sh', 0o755);
```

## `chown(path, uid, gid)`

```js
await fs.chown('file.txt', 1000, 1000);
```

## `utimes(path, atime, mtime)`

```js
await fs.utimes('file.txt', new Date(), new Date());
```

## `lutimes(path)`

```js
await fs.lutimes('file.txt', new Date(), new Date());
```

## `realpath(path)`

```js
console.log(await fs.realpath('./'));
```

## `mkdtemp(prefix)`

```js
console.log(await fs.mkdtemp('tmp-'));
```

## `writeFile(path, data)`

```js
await fs.writeFile('a.txt', 'Hello world');
```

## `appendFile(path, data)`

```js
await fs.appendFile('a.txt', '\nAppend');
```

## `readFile(path)`

```js
console.log(await fs.readFile('a.txt', 'utf8'));
```

## `watch(path)`

```js
for await (const event of fs.watch('./')) {
    console.log(event);
}
```

## Streams (createReadStream, createWriteStream)

```js
fs.createReadStream('a.txt').pipe(fs.createWriteStream('b.txt'));
```

# 2) **HELPER METHODS** (buatan sendiri – modern & simple)

## `exists(path)`

```js
if (await fs.exists('config.json')) {
    console.log('Ada!');
}
```

## `isFile(path)`

```js
console.log(await fs.isFile('a.txt')); // true/false
```

## `isDir(path)`

```js
console.log(await fs.isDir('src')); // true/false
```

## `ensureFile(path)`

```js
await fs.ensureFile('logs/app.log');
```

## `ensureDir(path)`

```js
await fs.ensureDir('dist/images/icons');
```

## `ensureEmptyDir(path)`

```js
await fs.ensureEmptyDir('dist');
```

## `emptyDir(path)`

```js
await fs.emptyDir('cache');
```

## `readJson(path)`

```js
const obj = await fs.readJson('config.json');
console.log(obj.name);
```

## `writeJson(path, data)`

```js
await fs.writeJson('config.json', {
    name: 'nodefs-lite',
});
```

# 3) **FULL COMBINED EXAMPLE**

```js
import fs from 'nodefs-lite';

await fs.ensureDir('data');

await fs.writeJson('data/info.json', {
    created: Date.now(),
    app: 'nodefs-lite',
});

const info = await fs.readJson('data/info.json');

console.log('Isi JSON:', info);

await fs.appendFile('data/log.txt', 'Log baru...\n');

console.log('Apakah data/log.txt ada?', await fs.exists('data/log.txt'));

console.log('Isi folder data:', await fs.readdir('data'));
```
