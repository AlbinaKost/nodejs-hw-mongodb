import  { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerContactController } from '../controllers/auth.js';
import { validateBody } from '../middleware/validateBody.js';
import { loginContactController } from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();
router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerContactController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginContactController));
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));
router.post('/refresh',authenticate, ctrlWrapper(refreshUserSessionController));
export default router;
