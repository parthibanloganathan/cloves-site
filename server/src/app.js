// For ES6 support, see https://medium.freecodecamp.org/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab
// For React frontend, see https://daveceddia.com/create-react-app-express-backend/
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/', indexRouter);

app.use("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public", "home.html"));
});

mongoose.connect(process.env.DATABASE_URL).then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`),
  );
});

export default app;