import { Router } from 'express';
import {
  userLogin,
  userRegister,
  userAlive,
} from '../controllers/user.controller';
const validator = require('express-joi-validation').createValidator({});
import Joi from 'joi';
import { authenticateJWT } from '../middleware/jwt.middleware';
const router = Router();

const UserJOI = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.get('/me', authenticateJWT, userAlive);
router.post('/login', validator.body(UserJOI), userLogin);
router.post('/register', validator.body(UserJOI), userRegister);

export default router;
