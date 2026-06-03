import type { Request, Response } from 'express';
import { readFile } from 'fs/promises';
import { PDFParse } from 'pdf-parse';
import Document from '../models/document.js';
import Chunk from '../models/chunk.js';
import { chunkText } from '../utils/chunk.js';
import { createEmbedding } from '../utils/embeddings.js';

export const uploadDocument = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'File is required' },
    });
    return;
  }

  const title = (req.body as { title?: string }).title ?? req.file.originalname;
  const userId = req.user!.userId;

  const document = await Document.create({
    title,
    fileName: req.file.originalname,
    userId,
  });

  const buffer = await readFile(req.file.path);
  const parser = new PDFParse({ data: buffer });
  const pdfData = await parser.getText();
  const chunks = chunkText(pdfData.text);

  await Promise.all(
    chunks.map(async (text) => {
      const embedding = await createEmbedding(text);
      return Chunk.create({ documentId: document._id, text, embedding });
    }),
  );

  res.status(201).json({ success: true, data: document, error: null });
};

export const getDocuments = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  const documents = await Document.find({ userId });
  res.status(200).json({ success: true, data: documents, error: null });
};

export const getDocument = (_req: Request, res: Response): void => {
  res.status(200).json({ success: true, data: null, error: null });
};

export const updateDocument = (_req: Request, res: Response): void => {
  res.status(200).json({ success: true, data: null, error: null });
};

export const deleteDocument = (_req: Request, res: Response): void => {
  res.status(204).send();
};

export const ingestDocument = (_req: Request, res: Response): void => {
  res.status(200).json({ success: true, data: null, error: null });
};
