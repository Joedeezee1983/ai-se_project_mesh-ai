import type { Request, Response } from 'express';

const FAKE_DOCUMENT = {
  documentId: 'doc_001',
  userId: 'user_001',
  filename: 'example.pdf',
  size: 204800,
  uploadedAt: '2026-01-01T00:00:00Z',
};

export const getDocuments = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: [FAKE_DOCUMENT],
    error: null,
  });
};

export const uploadDocument = (_req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: FAKE_DOCUMENT,
    error: null,
  });
};

export const getDocument = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: FAKE_DOCUMENT,
    error: null,
  });
};

export const updateDocument = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: { ...FAKE_DOCUMENT, filename: 'updated.pdf' },
    error: null,
  });
};

export const deleteDocument = (_req: Request, res: Response): void => {
  res.status(204).send();
};
