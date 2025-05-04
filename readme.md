# Bookshelf API

API RESTful untuk mengelola aplikasi rak buku. Proyek ini adalah bagian dari jalur pembelajaran Pengembangan Backend menggunakan Node.js dan Hapi Framework.

## Deskripsi

Bookshelf API memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada buku. Setiap buku berisi detail seperti nama, tahun, penulis, ringkasan, penerbit, jumlah halaman, dan status membaca.

## Fitur

- Menambahkan buku baru ke rak buku
- Mendapatkan daftar semua buku
- Melihat informasi detail buku tertentu
- Memperbarui informasi buku
- Menghapus buku dari rak buku
- Fitur query untuk memfilter buku berdasarkan nama, status membaca, dan status penyelesaian

## Instalasi

1. Clone repositori
2. Masuk ke direktori proyek
3. Pasang dependensi

```bash
npm install
```

## Penggunaan

Jalankan server dengan:

```bash
npm run start
```

Server akan berjalan di port 9000 secara default.

## Endpoint API

### Menambahkan buku

- **Metode**: POST
- **URL**: /books
- **Request Body**:

```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

### Mendapatkan semua buku

- **Metode**: GET
- **URL**: /books
- **Parameter Query**:
  - `name`: Memfilter buku yang mengandung string tertentu di nama (tidak case-sensitive)
  - `reading`: Memfilter buku berdasarkan status membaca (0: tidak sedang dibaca, 1: sedang dibaca)
  - `finished`: Memfilter buku berdasarkan status penyelesaian (0: belum selesai, 1: sudah selesai)

### Mendapatkan buku berdasarkan ID

- **Metode**: GET
- **URL**: /books/{id}

### Memperbarui buku

- **Metode**: PUT
- **URL**: /books/{id}
- **Request Body**: Sama seperti "Menambahkan buku"

### Menghapus buku

- **Metode**: DELETE
- **URL**: /books/{id}

## Struktur Proyek

```plaintext
bookshelf-api/
├── src/
│   ├── server.js       # Konfigurasi dan inisialisasi server
│   ├── routes.js       # Definisi rute API
│   ├── handler.js      # Penanganan request untuk setiap rute
│   └── books.js        # Pengelolaan data buku
├── package.json        # Dependensi dan script proyek
└── readme.md          # Dokumentasi proyek
```

## Pengujian

API ini dapat diuji menggunakan koleksi Postman dan environment yang telah disediakan. Untuk menguji:

1. Unduh koleksi dan environment pengujian dari [sini](https://github.com/dicodingacademy/a261-backend-pemula-labs/raw/099-shared-files/BookshelfAPITestCollectionAndEnvironment.zip)
2. Impor kedua file ke Postman
3. Pilih environment "Bookshelf API Test"
4. Jalankan tes koleksi

## Persyaratan

- Node.js
- npm (Node Package Manager)
- Hapi Framework

## Lisensi

Proyek ini dibuat untuk tujuan edukasi sebagai bagian dari jalur pembelajaran Pengembangan Backend Dicoding.
