/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/user';
const router = express.Router();

router.get('/users', controller.getUsers);

export = router;