# mesh-ai

An AI-powered backend system built with TypeScript and Node.js. Features a RESTful API architecture with authentication, chat management, document handling, and AI query processing.

## Built With

- TypeScript
- Node.js
- Express
- AI Integration

## Features

- User authentication and session management
- Chat history management
- Document upload and processing
- AI-powered query handling
- Structured REST API with clean route organization

## Project Structure
src/
├── controllers/    # Request handlers
│   ├── auth.ts
│   ├── chats.ts
│   ├── documents.ts
│   └── query.ts
├── middleware/     # Express middleware
│   ├── error.ts
│   └── logger.ts
├── routes/         # API route definitions
│   ├── auth.ts
│   ├── chats.ts
│   ├── documents.ts
│   └── query.ts
└── index.ts        # Entry point

## Getting Started

```bash
# Install dependencies
npm install

# Build
npm run build

# Run
npm start
```

## About

Built as part of the TripleTen AI Software Engineering program by Joseph Dobbs — AI Developer and founder of [JayDe](https://jay-de.com), a live SaaS AI assistant for Shopify merchants.
