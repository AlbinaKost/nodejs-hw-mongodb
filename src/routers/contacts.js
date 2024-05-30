import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';

import { ctrlWraper } from '../utils/ctrlWrapper.js';
const router = Router();

router.get('/', ctrlWraper(getAllContactsController));
router.get('/:contactId', ctrlWraper(getContactByIdController));
router.post('/', ctrlWraper(createContactController));
router.delete('/:contactId', ctrlWraper(deleteContactController));
router.patch('/:contactId', ctrlWraper(patchContactController));

export default router;
