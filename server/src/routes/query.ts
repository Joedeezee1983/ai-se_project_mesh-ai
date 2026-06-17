import { Router } from 'express';
import { queryDocuments, getChatQueries, getQuery } from '../controllers/query.js';
import { auth } from '../middleware/auth.js';

const queryRouter = Router();

queryRouter.use(auth);

queryRouter.post('/', queryDocuments);
queryRouter.get('/chats/:chatId', getChatQueries);
queryRouter.get('/:queryId', getQuery);

export { queryRouter };
