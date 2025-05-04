const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  // Ekstrak data buku dari payload request
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload || {};

  // Validasi: buku harus memiliki nama
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Validasi: halaman yang dibaca tidak boleh lebih dari total halaman
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // Siapkan metadata buku
  const bookId = nanoid(16);
  const isFinished = pageCount === readPage;
  const timestamp = new Date().toISOString();

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

  // Simpan buku ke dalam array
  books.push(bookEntry);

  // Verifikasi keberhasilan penyimpanan
  const isSuccess = books.some((book) => book.id === bookId);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  // Ambil parameter query untuk filtering
  const { name, reading, finished } = request.query;
  let filteredBooks = [...books];

  // Filter berdasarkan nama buku (jika ada)
  if (name) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name && book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter berdasarkan status sedang dibaca
  if (reading !== undefined) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }

  // Filter berdasarkan status selesai dibaca
  if (finished !== undefined) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
  }

  // Kembalikan daftar buku yang sudah difilter
  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name || '',
        publisher: book.publisher || '',
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((b) => b.id === id)[0];

  // Kembalikan detail buku jika ditemukan
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  // Buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload || {};
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  // Validasi: buku harus memiliki nama
  if (name === undefined || name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Validasi: halaman yang dibaca tidak boleh lebih dari total halaman
  if (parseInt(readPage) > parseInt(pageCount)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // Update buku jika ID ditemukan
  if (index !== -1) {
    const finished = pageCount === readPage;
    books[index] = {
      ...books[index],
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

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // ID buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  // Hapus buku jika ID ditemukan
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // ID buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};