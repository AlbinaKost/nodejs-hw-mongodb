import { registerUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import { logoutUser } from '../services/auth.js';

export const registerContactController = async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully registered a user!`,
        data: user,
    });
};
export const loginContactController = async (req, res) => {
    const user = await loginUser(req.body);
};

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
          accessToken: session.accessToken,
        },
      });
    };

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }
        res.clearCookie('sessionId');
        res.clearCookie('refreshToken');
        res.status(204).send();
};
