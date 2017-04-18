import path from 'path';

function routesMiddleware(req, res) {
  const currentPath = req.path;
  const authenticated = req.isAuthenticated();

  switch (currentPath) {
    case '/': {
      res.contentType('text/html').sendFile(path.join(__dirname, '../../app/index.html'));
      if (!authenticated) {
        res.redirect('/signin');
      }
      break;
    }

    case '/signin': {
      res.contentType('text/html').sendFile(path.join(__dirname, '../../app/index.html'));
      if (authenticated) {
        res.redirect('/');
      }
      break;
    }

    default: {
      res.redirect('/signin');
    }
  }
}

export default routesMiddleware;
