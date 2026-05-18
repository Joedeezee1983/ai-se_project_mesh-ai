import type { Request, Response } from 'express';

const FAKE_CHAT = {
  chatId: 'chat_001',
  userId: 'user_001',
  title: 'My First Chat',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-02T00:00:00Z',
};

export const getChats = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: [FAKE_CHAT],
    error: null,
  });
};

export const createChat = (_req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: FAKE_CHAT,
    error: null,
  });
};

export const getChat = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: FAKE_CHAT,
    error: null,
  });
};

export const updateChat = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: { ...FAKE_CHAT, title: 'Updated Chat Title' },
    error: null,
  });
};

export const deleteChat = (_req: Request, res: Response): void => {
  res.status(204).send();
};
