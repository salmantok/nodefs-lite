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

await fs.ensureFile('folder/file.txt');
await fs.write('folder/file.txt', 'Hello, world!');
console.log(await fs.read('folder/file.txt'));
```

atau

```js
import { fs } from 'nodefs-lite';

await fs.ensureFile('folder/file.txt');
await fs.write('folder/file.txt', 'Hello, world!');
console.log(await fs.read('folder/file.txt'));
```

atau

```js
import { ensureFile, write, read } from 'nodefs-lite';

await ensureFile('folder/file.txt');
await write('folder/file.txt', 'Hello, world!');
console.log(await read('folder/file.txt'));
```

## API

### `write(path, content)`

Menulis teks ke file (overwrite jika sudah ada).

```js
write('file.txt', 'Hello, world!');
```

Parameter:

- `path`: `string`
- `content`: `string`

Return: `Promise<void>`

### `read(path)`

Membaca isi file teks sebagai string.

```js
console.log(read('file.txt'));
```

Parameter:

- `path`: `string`

Return: `Promise<string>`

### `copy(src, dest)`

Menyalin file atau folder (rekursif).

```js
copy('file.txt', 'copied.txt');
copy('folder', 'copied');
```

Parameter:

- `src`: `string`
- `dest`: `string`

Return: `Promise<void>`

### `move(src, dest)`

Memindahkan file atau folder (alias `rename`).

```js
move('file.txt', 'renamed.txt');
move('folder', 'renamed');
```

Parameter:

- `src`: `string`
- `dest`: `string`

Return: `Promise<void>`

### `remove(path)`

Menghapus file atau folder (rekursif).

```js
remove('file.txt');
remove('folder');
```

Parameter:

- `path`: `string`

Return: `Promise<void>`

### `mkdir(path)`

Membuat folder (rekursif).

```js
mkdir('a/b/c');
```

Parameter:

- `path`: `string`

Return: `Promise<void>`

### `exists(path)`

Cek apakah file/folder ada.

```js
exists('file.txt');
exists('folder');
```

Parameter:

- `path`: `string`

Return: `Promise<boolean>`

### `ensureFile(path)`

Menjamin file ada. Jika belum ada, akan dibuat (termasuk folder-nya).

```js
ensureFile('folder/file.txt');
```

Parameter:

- `path`: `string`

Return: `Promise<void>`

### `writeJSON(path, data)`

Menulis object ke file JSON.

```js
writeJSON('data.json', { name: 'Salman', Country: 'Indonesia' });
```

Parameter:

- `path`: `string`
- `data`: `Object`

Return: `Promise<void>`

### `readJSON(path)`

Membaca file JSON dan mengembalikan object.

```js
console.log(readJSON('data.json'));
```

Parameter:

- `path`: `string`

Return: `Promise<Object>`
