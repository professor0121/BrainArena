import { sendRpcMessage } from '../services/rabbitmq.service.js';

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    // Ask Auth Server to verify
    const response = await sendRpcMessage('verify_admin_token', { token });
    console.log("Auth Server Response:", response);
    if (!response.success) {
      return res.status(401).json({ message: response.message || 'Unauthorized' });
    }

    req.admin = response.admin; // attach admin data to request
    next();
  } catch (err) {
    console.error('Error in adminMiddleware:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
