import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      req.logout();
      res.redirect('/signin');
    } else {
      res.redirect('/signin');
    }
  });

export default router;
