import type { Request, Response } from 'express';

const FAKE_QUERY = {
  queryId: 'query_001',
  chatId: 'chat_001',
  userId: 'user_001',
  question: 'What is the main topic of the document?',
  answer: 'The document covers the fundamentals of artificial intelligence.',
  createdAt: '2026-01-01T00:00:00Z',
};

export const submitQuery = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: FAKE_QUERY,
    error: null,
  });
};

export const getChatQueries = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: [FAKE_QUERY],
    error: null,
  });
};

export const getQuery = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: FAKE_QUERY,
    error: null,
  });
};
