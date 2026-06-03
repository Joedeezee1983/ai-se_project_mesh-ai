import { Router } from 'express';
import multer from 'multer';
import {
  getDocuments,
  uploadDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  ingestDocument,
} from '../controllers/documents.js';
import { auth } from '../middleware/auth.js';

const documentsRouter = Router();
const upload = multer({ dest: 'uploads/' });

documentsRouter.use(auth);

documentsRouter.get('/', getDocuments);
documentsRouter.post('/', upload.single('file'), uploadDocument);
documentsRouter.get('/:documentId', getDocument);
documentsRouter.patch('/:documentId', updateDocument);
documentsRouter.delete('/:documentId', deleteDocument);
documentsRouter.post('/:documentId/ingest', ingestDocument);

export { documentsRouter };
