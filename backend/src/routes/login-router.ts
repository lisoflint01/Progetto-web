import express, { Router } from 'express';
import * as loginController from '../controllers/login-controller.js'

const router: Router = express.Router();

router.post('/api/login', loginController.login);

export { router as loginRouter};