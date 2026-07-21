const mongoose = require('mongoose');

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn(
    'Mongoose disconnected from MongoDB. Attempting automatic reconnection...',
  );
});

const connectDB = async (retries = 5, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(
        `Attempting MongoDB connection (Attempt ${attempt}/${retries})...`,
      );
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully');
      return;
    } catch (err) {
      console.error(
        `MongoDB connection attempt ${attempt} failed: ${err.message}`,
      );
      if (attempt === retries) {
        console.error('All MongoDB connection attempts exhausted. Exiting...');
        process.exit(1);
      }
      console.log(`Waiting ${delay / 1000}s before next attempt...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
};

module.exports = connectDB;
