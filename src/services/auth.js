import bcrypt from 'bcrypt';
import { ContactsCollection } from '../db/models/user.js';

export const registerUser = async (payload) => {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    return await ContactsCollection.create(...payload,
        { password: encryptedPassword });
};
