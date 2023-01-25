require('dotenv').config();
const mongoose = require("mongoose");

const app = require('./app');

mongoose.set('strictQuery', true);

const {PORT = 3000, DB_HOST} = process.env;

(async () => {
  await mongoose.connect(DB_HOST)
    // .then(() => console.log('Database connection successful'))
    .catch(e => {
      console.log(`Database error: ${e.message}`);
      process.exit(1);
    });

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
})();
