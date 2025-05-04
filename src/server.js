const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {

  // Membuat server baru
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Menggunakan plugin Hapi untuk mengelola rute
  server.route(routes);
  // Memulai server dan menunggu hingga server siap
  await server.start();
  // Menampilkan pesan ketika server berhasil dijalankan
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
