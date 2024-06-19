import mongoose from 'mongoose';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  upsertContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;
    const contacts = await getAllContacts({
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });
    res.status(200).json({
      status: res.statusCode,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  try {
    const contact = await getContactById(contactId, userId);
    if (!contact) {
      next(createHttpError(404, `Contact with id ${contactId} not found!`));
      return;
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id: ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user._id };
    const contact = await createContact(data);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  try {
    const result = await upsertContact(contactId, userId, req.body);

    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  try {
    const contact = await deleteContact(contactId, userId);

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
