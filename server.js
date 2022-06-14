const app = require('./app');

const mongoose= require('mongoose');

require('dotenv').config();

const {PORT=3000, DB_HOST}=process.env;



mongoose.connect(DB_HOST).then(() => {
  console.log('DB is connected');
  app.listen(PORT);
}).then(() => {
  console.log(`Server is on ${PORT}`);
}).catch((err) => {
  console.log('ERROR', err);
  process.exit(1);
});



// const mongoose = require("mongoose");
// const app = require("./app");

// const { DB_HOST, PORT = 3000 } = process.env;

// mongoose.connect(DB_HOST).then(() => {
//     console.log("Database connection successful");
//     app.listen(PORT, () => {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });