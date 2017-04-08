import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import session from 'cookie-session';

import passportConfig from './config/passport/passport.config';
import authRouter from './routers/auth';
import logoutRouter from './routers/logout';
import syncRouter from './routers/sync';
import usersApiRouter from './routers/api/trelloUsers';
import boardsApiRouter from './routers/api/boards';
import actionsApiRouter from './routers/api/actions';

/* eslint-disable no-console */
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL_MLAB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db connected'));

app.use(express.static(path.join(__dirname, './../app/public')));
app.use(express.static('dist'));
app.use(session({ secret: process.env.SESSION_SECRET }));
passportConfig(app);

app.use('/auth', authRouter);
app.use('/logout', logoutRouter);
app.use('/sync', syncRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/boards', boardsApiRouter);
app.use('/api/actions', actionsApiRouter);

app.listen(port, () => {
  console.log(`app running on ${port} port`);
});
