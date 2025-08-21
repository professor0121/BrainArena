import jwt from 'jsonwebtoken';

export const adminAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]||req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify token and extract admin information
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Attach admin information to request object
    req.admin = decoded;
    next();
  });
};