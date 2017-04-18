import express from 'express';
import webpack from 'webpack';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import session from 'cookie-session';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import winston from 'winston';
import passportConfig from './config/passport/passport.config';
import webpackConfig from './../webpack.config.dev';
import routesMiddleware from './helpers/routesMiddleware';

import authRouter from './routers/auth';
import logoutRouter from './routers/logout';
import syncRouter from './routers/sync';
import usersApiRouter from './routers/api/trelloUsers';
import boardsApiRouter from './routers/api/boards';
import actionsApiRouter from './routers/api/actions';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(webpackConfig);

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'debug.log' }),
  ],
});
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', err => winston.error(`Connection error${err.message}`));
db.once('open', () => winston.info('Connection opened'));

app.use(express.static(path.join(__dirname, '../app/public')));
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

app.use(routesMiddleware);

app.listen(port, () => {
  winston.info(`app running on ${port} port`);
});
