// import errors from './components/errors';

export default function(server) {

  // Insert routes below
  // server.use('/api/users', require('./api/user'));

  // server.use('/auth', require('./auth'));

  server.use('/api/iteneraries', require('./api/iteneraries'));
  // All undefined asset or api routes should return a 404
  // server.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

  // All other routes should redirect to the index.html
  // server.route('/*')
  //   .get(function(req, res) {
  //     res.sendfile(server.get('appPath') + '/index.html');
  //   });
};
