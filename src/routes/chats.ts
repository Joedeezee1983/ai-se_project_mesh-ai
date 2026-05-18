import { Router } from 'express';
import {
  getChats,
  createChat,
  getChat,
  updateChat,
  deleteChat,
} from '../controllers/chats.js';

const chatsRouter = Router();

chatsRouter.get('/', getChats);
chatsRouter.post('/', createChat);
chatsRouter.get('/:chatId', getChat);
chatsRouter.patch('/:chatId', updateChat);
chatsRouter.delete('/:chatId', deleteChat);

export { chatsRouter };
