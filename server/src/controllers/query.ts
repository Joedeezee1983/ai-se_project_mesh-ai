import type { Request, Response } from 'express';
import Document from '../models/document.js';
import Chunk from '../models/chunk.js';
import { createEmbedding } from '../utils/embeddings.js';
import { rankBySimilarity } from '../utils/vector-search.js';
import { getClient, LLM_MODEL, buildContext } from '../utils/openai-client.js';

export const queryDocuments = async (req: Request, res: Response): Promise<void> => {
  const { question } = req.body as { question?: string };

  if (!question) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'question is required' },
    });
    return;
  }

  const userId = req.user!.userId;
  const userDocs = await Document.find({ userId }, '_id');
  const docIds = userDocs.map((d) => d._id);

  const chunkRecords = await Chunk.find({ documentId: { $in: docIds } });
  const chunks = chunkRecords.map((c) => ({
    id: String(c._id),
    documentId: String(c.documentId),
    text: c.text,
    embedding: c.embedding,
  }));

  const queryEmbedding = await createEmbedding(question);
  const ranked = rankBySimilarity(queryEmbedding, chunks, 5);
  const context = buildContext(ranked);

  const completion = await getClient().chat.completions.create({
    model: LLM_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant. Answer questions using only the provided context. If the answer is not in the context, say so.',
      },
      {
        role: 'user',
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  const answer = completion.choices[0]?.message.content ?? 'No answer generated.';

  res.status(200).json({ success: true, data: { answer }, error: null });
};

export const getChatQueries = (_req: Request, res: Response): void => {
  res.status(200).json({ success: true, data: [], error: null });
};

export const getQuery = (_req: Request, res: Response): void => {
  res.status(200).json({ success: true, data: null, error: null });
};
