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
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

3. Create a default admin user:
```bash
npm run create-default-user
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

3. Add your environment variables in the Vercel dashboard:
   - MONGODB_URI
   - NODE_ENV
   - JWT_SECRET

## API Endpoints

### Public Endpoints
- `GET /`: Welcome message

### Authentication Endpoints
- `POST /api/auth/register`: Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /api/auth/login`: Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me`: Get current user (requires authentication)
  - Headers: `Authorization: Bearer <token>`

### Intake Form Endpoints
- `POST /api/intake-forms`: Create a new intake form (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Body: All intake form fields

- `GET /api/intake-forms`: Get all intake forms (admin only)
  - Headers: `Authorization: Bearer <token>`

- `GET /api/intake-forms/:id`: Get intake form by ID (requires authentication)
  - Headers: `Authorization: Bearer <token>`

- `PUT /api/intake-forms/:id`: Update intake form (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Body: Updated intake form fields

- `DELETE /api/intake-forms/:id`: Delete intake form (requires authentication)
  - Headers: `Authorization: Bearer <token>`

### Subscription Endpoints
- `POST /api/subscriptions`: Create a new subscription (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Body: All subscription fields

- `GET /api/subscriptions`: Get all subscriptions (admin only)
  - Headers: `Authorization: Bearer <token>`

- `GET /api/subscriptions/:id`: Get subscription by ID (requires authentication)
  - Headers: `Authorization: Bearer <token>`

- `PUT /api/subscriptions/:id`: Update subscription (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Body: Updated subscription fields

- `DELETE /api/subscriptions/:id`: Delete subscription (requires authentication)
  - Headers: `Authorization: Bearer <token>`

- `PATCH /api/subscriptions/:id/status`: Update subscription status (admin only)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "status": "active" }` (status can be "active", "inactive", or "pending") 