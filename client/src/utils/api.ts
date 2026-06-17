const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type KnowledgeDoc = {
  _id: string;
  title: string;
  fileName: string;
  userId: string;
  createdAt: string;
};

export type Chat = {
  _id: string;
  title: string;
  userId: string;
  createdAt: string;
};

export type Message = {
  _id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: { message: string } | null;
};

export const getDocuments = async (): Promise<ApiResponse<KnowledgeDoc[]>> => {
  await delay(700);
  return {
    success: true,
    data: [
      {
        _id: '1',
        title: 'Code Review Guidelines',
        fileName: 'code-review-guidelines.pdf',
        userId: 'u1',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        title: 'Onboarding Handbook',
        fileName: 'onboarding-handbook.pdf',
        userId: 'u1',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '3',
        title: 'API Documentation',
        fileName: 'api-documentation.pdf',
        userId: 'u1',
        createdAt: new Date().toISOString(),
      },
    ],
    error: null,
  };
};

export const uploadDocument = async (
  file: File
): Promise<ApiResponse<KnowledgeDoc>> => {
  await delay(1200);
  return {
    success: true,
    data: {
      _id: Date.now().toString(),
      title: file.name,
      fileName: file.name,
      userId: 'u1',
      createdAt: new Date().toISOString(),
    },
    error: null,
  };
};

export const deleteDocument = async (
  id: string
): Promise<ApiResponse<null>> => {
  await delay(500);
  console.log('deleteDocument stub called with id:', id);
  return { success: true, data: null, error: null };
};

export const getChats = async (): Promise<ApiResponse<Chat[]>> => {
  await delay(600);
  return {
    success: true,
    data: [
      {
        _id: 'c1',
        title: 'How do I set up the dev environment?',
        userId: 'u1',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'c2',
        title: 'What is the onboarding process?',
        userId: 'u1',
        createdAt: new Date().toISOString(),
      },
    ],
    error: null,
  };
};

export const createChat = async (
  title: string
): Promise<ApiResponse<Chat>> => {
  await delay(400);
  return {
    success: true,
    data: {
      _id: Date.now().toString(),
      title,
      userId: 'u1',
      createdAt: new Date().toISOString(),
    },
    error: null,
  };
};

export const getMessages = async (
  chatId: string
): Promise<ApiResponse<Message[]>> => {
  await delay(500);
  console.log('getMessages stub called with chatId:', chatId);
  return { success: true, data: [], error: null };
};

export const sendMessage = async (
  chatId: string,
  content: string
): Promise<ApiResponse<Message>> => {
  await delay(900);
  console.log('sendMessage stub called with chatId:', chatId, 'content:', content);
  return {
    success: true,
    data: {
      _id: Date.now().toString(),
      chatId,
      role: 'assistant',
      content: 'This is a mock response from the assistant.',
      createdAt: new Date().toISOString(),
    },
    error: null,
  };
};
