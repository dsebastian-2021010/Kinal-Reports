require('dotenv').config();
const connectDB = require('./config/database');
const app = require('./app');

const start = async () => {
  try {
    await connectDB();
    await app.listen({
      port: process.env.PORT,
      host: '0.0.0.0'
    });
    console.log(`Events Service running on port ${process.env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();