import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import errorhandler from 'errorhandler';

import config from './environment';

export default function(server) {
  server.use(compression());
  server.use(bodyParser.json());
  server.use(logger('dev'));

  // Static content
  server.use('/public', express.static(path.join(__dirname, '/build')));
  server.use('/images', express.static(path.join(__dirname, '/static/images')));
  // server.use(favicon(path.join(__dirname, '/static/images')));

  require('../routes')(server);

  server.use(errorhandler()); // Must be last!
}
