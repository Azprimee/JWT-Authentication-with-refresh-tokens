import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import auth from './routes/auth';
import route from './routes/route';
import dbConfig from './config/database';
import secureAuth from './middlewares/auth';
import passport from './config/passport';

const app = express();

passport();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.mongoUrl, dbConfig.settings, err => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection: ' + err);
  }
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', auth());
app.use('/profile', secureAuth, route());
app.listen(3000, () => {
  console.log('Server listen on 3000 port');
});
