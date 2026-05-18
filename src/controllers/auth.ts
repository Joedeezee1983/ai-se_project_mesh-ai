import type { Request, Response } from 'express';

export const register = (_req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {
      userId: 'user_001',
      email: 'user@example.com',
      name: 'John Doe',
      createdAt: '2026-01-01T00:00:00Z',
    },
    error: null,
  });
};

export const login = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      token: 'fake_jwt_token_abc123',
      userId: 'user_001',
      email: 'user@example.com',
    },
    error: null,
  });
};

export const logout = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: { message: 'Logged out successfully' },
    error: null,
  });
};

export const getCurrentUser = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      userId: 'user_001',
      email: 'user@example.com',
      name: 'John Doe',
      createdAt: '2026-01-01T00:00:00Z',
    },
    error: null,
  });
};
