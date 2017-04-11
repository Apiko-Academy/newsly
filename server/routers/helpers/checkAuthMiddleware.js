export default function (req, res, next) {
  if (req.isAuthenticated()) {
    res.status(200);
    next();
  } else {
    res.status(403).redirect('/');
  }
}
