const { addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler } = require('./handler');


const routes = [
  {
    // Rute untuk menambahkan buku baru
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    // Rute untuk mendapatkan semua buku
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler

  },
  {
    // Rute untuk mendapatkan buku berdasarkan ID
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler
  },
  {
    // Rute untuk mengedit buku berdasarkan ID
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler
  },
  {
    // Rute untuk menghapus buku berdasarkan ID
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler
  }
];

module.exports = routes;
