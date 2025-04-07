# Nail App Express API

This is a Node.js Express application designed to be deployed on Vercel.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your environment variables:
```
PORT=3000
```

## Development

To run the development server:
```bash
npm run dev
```

## Production

To run the production server:
```bash
npm start
```

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

## API Endpoints

- `GET /`: Welcome message 