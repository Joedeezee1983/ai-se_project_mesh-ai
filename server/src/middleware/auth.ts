import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, data: null, error: { message: 'Unauthorized' } });
    return;
  }

  try {
    const token = authHeader.split(' ')[1]!;
    const decoded = jwt.verify(token, process.env['JWT_SECRET']!) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch {
    res.status(401).json({ success: false, data: null, error: { message: 'Unauthorized' } });
  }
};
