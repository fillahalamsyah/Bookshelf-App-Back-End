const { nanoid } = require('nanoid');
const books = require('./books');

// Handler untuk menambahkan buku baru
const addBookHandler = (request, h) => {
  // Ekstraksi data dari payload
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload || {};

  // Validasi keberadaan nama buku
  if (!name) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);

    return response;
  }

  // Validasi logika halaman baca
  if (readPage > pageCount) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);

    return response;
  }

  // Persiapan metadata buku
  const bookId = nanoid(16);
  const isFinished = (pageCount === readPage);
  const timestamp = new Date().toISOString();

  // Pembuatan objek buku lengkap
  const bookEntry = {
    id: bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: isFinished,
    insertedAt: timestamp,
    updatedAt: timestamp
  };

  // Penyimpanan data buku
  books.push(bookEntry);

  // Verifikasi keberhasilan operasi
  const isSuccess = books
    .some((book) => book.id === bookId);

  // Pengembalian respons sukses
  if (isSuccess) {
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { bookId },
      })
      .code(201);
  }

  // Pengembalian respons gagal
  return h
    .response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    })
    .code(500);
};

// Handler untuk mendapatkan semua buku
const getAllBooksHandler = (request, h) => {
  // Ekstraksi parameter query
  const {
    name,
    reading,
    finished
  } = request.query;

  // Salin daftar buku untuk difilter
  let filteredBooks = [...books];

  // Filter berdasarkan nama (case-insensitive)
  if (name) {
    filteredBooks = filteredBooks
      .filter((book) => book.name &&
        book.name
          .toLowerCase()
          .includes(name.toLowerCase())
      );
  }

  // Filter berdasarkan status baca
  if (reading !== undefined) {
    const isReading = reading === '1';

    filteredBooks = filteredBooks
      .filter((book) =>
        book.reading === isReading
      );
  }

  // Filter berdasarkan status selesai
  if (finished !== undefined) {
    const isFinished = finished === '1';

    filteredBooks = filteredBooks
      .filter((book) =>
        book.finished === isFinished
      );
  }

  // Menyusun data respons yang diringkas
  const simplifiedBooks = filteredBooks
    .map((book) => ({
      id: book.id,
      name: book.name || '',
      publisher: book.publisher || '',
    }));

  // Pengembalian respons sukses
  return h
    .response({
      status: 'success',
      data: {
        books: simplifiedBooks,
      },
    })
    .code(200);
};

// Handler untuk mendapatkan detail buku berdasarkan ID
const getBookByIdHandler = (request, h) => {
  // Ambil ID dari parameter
  const { id } = request.params;

  // Cari buku dengan ID yang sesuai
  const targetBook = books
    .find((book) => book.id === id);

  // Berikan detail buku jika ditemukan
  if (targetBook) {
    return {
      status: 'success',
      data: {
        book: targetBook,
      },
    };
  }

  // Respons jika buku tidak ditemukan
  return h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);
};

// Handler untuk memperbarui data buku
const editBookByIdHandler = (request, h) => {
  // Ambil ID dari parameter
  const { id } = request.params;

  // Ekstraksi data dari payload
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload || {};

  // Perbarui timestamp
  const updatedAt = new Date().toISOString();

  // Cari indeks buku yang akan diperbarui
  const bookIndex = books
    .findIndex((book) => book.id === id);

  // Validasi keberadaan nama
  if (name === undefined || name === '') {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  // Validasi logika halaman baca
  if (parseInt(readPage) > parseInt(pageCount)) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  // Proses pembaruan jika buku ditemukan
  if (bookIndex !== -1) {
    // Hitung status selesai baca
    const finished = (pageCount === readPage);

    // Perbarui data buku
    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    // Respons sukses
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
  }

  // Respons jika ID tidak ditemukan
  return h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);
};

// Handler untuk menghapus buku
const deleteBookByIdHandler = (request, h) => {
  // Ambil ID dari parameter
  const { id } = request.params;

  // Cari indeks buku yang akan dihapus
  const bookIndex = books
    .findIndex((book) => book.id === id);

  // Proses penghapusan jika buku ditemukan
  if (bookIndex !== -1) {
    // Hapus buku dari array
    books.splice(bookIndex, 1);

    // Respons sukses
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);
  }

  // Respons jika ID tidak ditemukan
  return h
    .response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    .code(404);
};

// Ekspor semua handler
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};