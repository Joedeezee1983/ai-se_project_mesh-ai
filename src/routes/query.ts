import { Router } from 'express';
import {
  submitQuery,
  getChatQueries,
  getQuery,
} from '../controllers/query.js';

const queryRouter = Router();

queryRouter.post('/', submitQuery);
queryRouter.get('/chats/:chatId', getChatQueries);
queryRouter.get('/:queryId', getQuery);

export { queryRouter };
