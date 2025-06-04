// server/routes/auth.js
import express from 'express';

//eslint-disable-next-line no-unused-vars
import { loginUser} from '../controllers/authController.js';
 



const router = express.Router();

// POST /api/auth/login
router.post('/login', loginUser);

export default router;
