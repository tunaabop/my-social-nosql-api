// import mongoose
const mongoose = require('mongoose');

// this is the local connection to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// export mongoose connection
module.exports = mongoose.connection;