import express from 'express';
import path from 'path';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.sendFile(path.join(__dirname, './../../app/views/index.html'));
    } else {
      res.status(200).sendFile(path.join(__dirname, './../../app/views/signin.html'));
    }
  });

export default router;
