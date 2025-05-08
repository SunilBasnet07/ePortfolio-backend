import mongoose from "mongoose";

// Verify environment variables
if (!process.env.MONGODB_URL) {
  console.error('MONGODB_URL is not defined in environment variables');
  process.exit(1);
}

const mongoDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URL:', process.env.MONGODB_URL.replace(/\/\/[^:]+:[^@]+@/, '//<credentials>@')); // Safely log URL without credentials

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    await mongoose.connect(process.env.MONGODB_URL, options);
    
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
      console.log('Database name:', mongoose.connection.name);
      console.log('Host:', mongoose.connection.host);
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error:', error);
    // Retry connection after 5 seconds
    console.log('Retrying connection in 5 seconds...');
    setTimeout(mongoDB, 5000);
  }
};

export default mongoDB;