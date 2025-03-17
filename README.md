# Innohead Website Enhancement

This project enhances the Innohead website with a secure form handling system, modern login interface, admin dashboard, and improved UI/UX.

## Features

- **Backend Interface for Forms**: Secure form handling with validation and MongoDB storage
- **Modern Login Interface**: User authentication system with JWT
- **Admin Dashboard**: Management interface for user submissions and analytics
- **Enhanced Front-End**: Improved UI/UX with React

## Tech Stack

- **Frontend**: React, Material-UI, Recharts
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt

## Project Structure

```
innohead/
├── client/             # React frontend
│   ├── public/         # Static files
│   └── src/            # React source code
└── server/             # Node.js backend
    ├── config/         # Configuration files
    ├── controllers/    # Route controllers
    ├── middleware/     # Custom middleware
    ├── models/         # Mongoose models
    └── routes/         # API routes
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd innohead
   ```

2. Install server dependencies
   ```
   cd server
   npm install
   ```

3. Install client dependencies
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/innohead
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

### Running the Application

1. Seed the database with an admin user
   ```
   cd server
   npm run seed
   ```

2. Start the server
   ```
   npm run dev
   ```

3. In a separate terminal, start the client
   ```
   cd client
   npm start
   ```

4. Access the application at `http://localhost:3000`

### Admin Login

- Email: admin@innohead.com
- Password: admin123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Forms
- `POST /api/forms` - Submit a new form
- `GET /api/forms` - Get all forms (admin only)
- `GET /api/forms/:id` - Get form by ID (admin only)
- `PUT /api/forms/:id` - Update form status (admin only)

### Admin
- `GET /api/admin/analytics` - Get dashboard analytics
- `GET /api/admin/users` - Get all users
- `POST /api/admin/create-admin` - Create admin user # innoHead
