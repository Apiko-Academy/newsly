import express from 'express';
import webpack from 'webpack';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import session from 'cookie-session';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import fs from 'fs';
import passportConfig from './config/passport/passport.config';
import webpackConfig from './../webpack.config.dev';

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
const compiler = webpack(webpackConfig);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db connected'));

app.use(express.static(path.join(__dirname, './../app/public')));
app.use(session({ secret: process.env.SESSION_SECRET }));
passportConfig(app);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.use('/auth', authRouter);
app.use('/logout', logoutRouter);
app.use('/sync', syncRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/boards', boardsApiRouter);
app.use('/api/actions', actionsApiRouter);
app.use((req, res) => {
  res.contentType('text/html').sendFile(`${fs.realpathSync(process.cwd())}/app/public/index.html`);
});

app.listen(port, () => {
  console.log(`app running on ${port} port`);
});
