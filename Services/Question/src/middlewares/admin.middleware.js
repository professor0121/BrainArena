// src/middlewares/adminMiddleware.js
import { publish, consume } from '../services/rabbit.js';
import { randomUUID } from 'crypto';

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    const correlationId = randomUUID();
    const replyQueue = 'auth_response_queue';

    const responsePromise = new Promise((resolve, reject) => {
      consume(replyQueue, (msg) => {
        if (msg.correlationId === correlationId) {
          resolve(msg);
        }
      });
      setTimeout(() => reject(new Error('Auth timeout')), 5000);
    });

    publish('auth_request_queue', { token, correlationId, replyQueue });

    const result = await responsePromise;

    if (!result.valid || result.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    req.admin = result.admin;
    next();
  } catch (err) {
    console.error('Admin middleware error:', err.message);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
