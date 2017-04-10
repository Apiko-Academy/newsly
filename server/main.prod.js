import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import session from 'cookie-session';
import winston from 'winston';

import passportConfig from './config/passport/passport.config';
import authRouter from './routers/auth';
import logoutRouter from './routers/logout';
import syncRouter from './routers/sync';
import usersApiRouter from './routers/api/trelloUsers';
import boardsApiRouter from './routers/api/boards';
import actionsApiRouter from './routers/api/actions';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'debug.log' }),
  ],
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL_MLAB);
const db = mongoose.connection;
db.on('error', err => winston.error(`Connection error${err.message}`));
db.once('open', () => winston.info('Connection opened'));

app.use(express.static(path.join(__dirname, '../app/public')));
app.use(express.static('dist'));
app.use(session({ secret: process.env.SESSION_SECRET }));
passportConfig(app);

app.use('/auth', authRouter);
app.use('/logout', logoutRouter);
app.use('/sync', syncRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/boards', boardsApiRouter);
app.use('/api/actions', actionsApiRouter);

app.use((req, res) => {
  res.contentType('text/html').sendFile(path.join(__dirname, '../app/public/index.html'));
});

app.listen(port, () => {
  winston.info(`app running on ${port} port`);
});
