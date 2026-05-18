import { Router } from 'express';
import {
  getDocuments,
  uploadDocument,
  getDocument,
  updateDocument,
  deleteDocument,
} from '../controllers/documents.js';

const documentsRouter = Router();

documentsRouter.get('/', getDocuments);
documentsRouter.post('/', uploadDocument);
documentsRouter.get('/:documentId', getDocument);
documentsRouter.patch('/:documentId', updateDocument);
documentsRouter.delete('/:documentId', deleteDocument);

export { documentsRouter };
