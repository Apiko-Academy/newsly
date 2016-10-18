import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      req.logout();
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });

export default router;
