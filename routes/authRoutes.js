import express from 'express';
import {login,signup,refresh,logout} from '../controllers/authController.js';
const router = express.Router();

router.route('/')
    .post(login)

router.route('/signup')
    .post(signup)

router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .post(logout)


export const authRouter = router;