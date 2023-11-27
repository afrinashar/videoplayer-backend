const mongoose = require('mongoose');
const { MONGODB_URI } = require('./constants');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process on a database connection error
  }
};

module.exports = { connectToDatabase };
