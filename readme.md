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

fs.writeFile('__data.txt', 'Hello World!');
```

## API

### Basic Helpers

#### `exists(path): Promise<boolean>`

Cek apakah file/direktori ada.

```js
fs.exists('__file.txt'); // true/false
```

#### `ensureDir(dir): Promise<void>`

Pastikan direktori ada. Jika belum ada akan dibuat.

```js
fsx.ensureDir('__logs');
```

#### `ensureFile(file): Promise<void>`

Pastikan file ada. Jika belum ada, direktori dibuat dan file dikosongkan.

```js
fs.ensureFile('__data/__config.json');
```

#### `ensureEmptyDir(dir): Promise<void>`

Menghapus direktori secara rekursif lalu membuat ulang direktori kosong.

```js
fs.ensureEmptyDir('__dist');
```

### File Operations

#### `readFile(path, encoding = 'utf8'): Promise<string | Buffer>`

Membaca isi file.

```js
fs.readFile('__hello.txt');
```

#### `writeFile(path, data, encoding = 'utf8'): Promise<void>`

Menulis file dan otomatis membuat direktori jika belum ada.

```js
fs.writeFile('__output/__message.txt', 'Hi!');
```

#### `appendFile(path, data, encoding = 'utf8'): Promise<void>`

Menambahkan data ke akhir file.

```js
fs.appendFile('__log.txt', '[INFO] Started\n');
```

#### `remove(path): Promise<void>`

Menghapus file/direktori (recursive & force).

```js
fs.remove('__dist');
```

#### `rename(oldPath, newPath): Promise<void>`

Rename atau memindahkan file (auto-create folder tujuan).

```js
fs.rename('__a.txt', '__backup/__a.txt');
```

#### `move(src, dest): Promise<void>`

Alias rename untuk konsistensi.

```js
fs.move('__temp.zip', '__backup/__temp.zip');
```

#### `copy(src, dest): Promise<void>`

Menyalin file ke lokasi baru.

```js
fs.copy('__logo.png', '__public/__logo.png');
```

### Directory Helpers

#### `readDir(dir): Promise<string[]>`

Membaca isi direktori.

```js
fs.readDir('__src');
```

#### `emptyDir(dir): Promise<void>`

Mengosongkan isi direktori tetapi tidak menghapus direktori.

```js
fs.emptyDir('__cache');
```

### JSON Helpers

#### `readJSON(path): Promise<any>`

Membaca JSON dan otomatis parse.

```js
fs.readJSON('__config.json');
```

#### `writeJSON(path, obj): Promise<void>`

Menyimpan objek ke file JSON dengan format rapi (2 spaces).

```js
await fsx.writeJSON('__config.json', { name: 'App' });
```

### Info Utilities

#### `stat(path): Promise<Stats>`

Mendapatkan informasi file.

```js
fs.stat('__data.txt');
```

#### `isFile(path): Promise<boolean>`

Cek apakah path adalah file.

```js
fs.isFile('__data.txt');
```

#### `isDir(path): Promise<boolean>`

Cek apakah path adalah folder.

```js
fs.isDir('__data');
```

#### `size(path): Promise<number>`

Ukuran file dalam bytes.

```js
fs.size('__video.mp4');
```

#### `fileExt(path): string`

Ekstensi file.

```js
fsx.fileExt('__a.txt'); // ".txt"
```

#### `fileName(path): string`

Nama file dari path.

```js
fsx.fileName('__app/__data/__a.txt'); // "__a.txt"
```

### Stream Helpers

#### `createReadStream(path): ReadStream`

Membuat stream pembaca file.

```js
fs.createReadStream('__bigfile.zip');
```

#### `createWriteStream(path): WriteStream`

Membuat stream penulis file.

```js
fs.createWriteStream('__output.log');
```
