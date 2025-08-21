import { sendRpcMessage } from '../services/rabbitmq.service.js';

export const userMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    // Ask Auth Server to verify
    const response = await sendRpcMessage('verify_user_token', { token });
    console.log("Auth Server Response:", response);
    if (!response.success) {
      return res.status(401).json({ message: response.message || 'Unauthorized' });
    }

    req.user = response.user; // attach user data to request
    next();
  } catch (err) {
    console.error('Error in userMiddleware:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
