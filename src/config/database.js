import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
  mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-vi8dl.mongodb.net/test?retryWrites=true&w=majority`,
  settings: {
    useNewUrlParser: true
  }
};
