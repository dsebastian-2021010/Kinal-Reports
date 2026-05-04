require('dotenv').config();
const connectDB = require('./config/database.js');
const app = require('./app');

const start = async () => {
  try {
    await connectDB();

    await app.listen({
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0'
    });

    console.log(`Servicio corriendo en el puerto ${process.env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();