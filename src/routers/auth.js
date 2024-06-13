import  { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerContactController } from '../controllers/auth.js';
import { validateBody } from '../middleware/validateBody.js';


const router = Router();
router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerContactController));
export default router;
