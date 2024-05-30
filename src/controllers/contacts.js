import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    next (createHttpError(404, `Contact with id not found!`));
    return;
  }

  res.json ({
    status :200,
    message: `Successfully found contact with id: ${contactId}!`,
    data: contact
  })
}
export const createContactController = async (req, res, next) => {
  const { body } = req;
  const contact = await createContact(body);

  if (!contact) {
    next(createHttpError(404, `Contact with id not found!`));
    return;
  }

  res.status(201).json({
    status: 200,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, `Contact with id not found!`));
    return;
  }

  res.status(204).json();
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const contact = await updateContact(contactId, body);
  if (!contact) {
    next(createHttpError(404, `Contact with id not found!`));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully updated contact with id: ${contactId}!`,
    data: contact,
  });
}
