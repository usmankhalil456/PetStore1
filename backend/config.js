import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://usmankhalil456:passwords08@cluster0.b77tf.mongodb.net/AnimalKingdom?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || 'No-GOOGLE_KEY',
  AMAZON_ACCESS_KEY_ID: process.env.AMAZON_ACCESS_KEY_ID || 'NO_AMAZON_ID',
  AMAZON_SECRET_ACCESS_KEY:
    process.env.AMAZON_SECRET_ACCESS_KEY || 'NO_AMAZON_KEY',
};
