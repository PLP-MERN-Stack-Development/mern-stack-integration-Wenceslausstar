# TODO: MERN Stack Blog Application Development

## Task 1: Project Setup

- [x] Fix MongoDB Connection Issue

  - [x] Update server/server.js to use `process.env.MONGO_URI` instead of `process.env.MONGODB_URI` in mongoose.connect()
  - [x] Restart the server to test the MongoDB connection
  - [x] Verify connection logs ("Connected to MongoDB") and check for any remaining errors

- [x] Set up Express.js server with necessary middleware
- [x] Create a React front-end using Vite and configure proxy for API calls
- [x] Implement environment variables for configuration management

## Task 2: Back-End Development

- [x] Design and implement a RESTful API for a blog application with the following endpoints:
  - [x] GET /api/posts: Get all blog posts
  - [x] GET /api/posts/:id: Get a specific blog post
  - [x] POST /api/posts: Create a new blog post
  - [x] PUT /api/posts/:id: Update an existing blog post
  - [x] DELETE /api/posts/:id: Delete a blog post
  - [x] GET /api/categories: Get all categories
  - [x] POST /api/categories: Create a new category
- [x] Create Mongoose models for Post and Category with proper relationships
- [x] Implement input validation using a library like Joi or express-validator
- [x] Add error handling middleware for API routes

## Task 3: Front-End Development

- [x] Create React components for:
  - [x] Post list view
  - [x] Single post view
  - [x] Create/edit post form
  - [x] Navigation and layout
- [x] Implement React Router for navigation between different views
- [x] Use React hooks for state management (useState, useEffect, useContext)
- [x] Create a custom hook for API calls

## Task 4: Integration and Data Flow

- [x] Implement API service in React to communicate with the back-end
- [x] Set up state management for posts and categories
- [x] Create forms with proper validation for creating and editing posts
- [x] Implement optimistic UI updates for better user experience
- [x] Handle loading and error states for API calls

## Task 5: Advanced Features

- [x] Add user authentication (registration, login, protected routes)
- [x] Implement image uploads for blog post featured images
- [x] Add pagination for the post list
- [x] Implement searching and filtering functionality
- [x] Add comments feature for blog posts

## Expected Outcome

- [x] A fully functional MERN stack blog application
- [x] Proper integration between MongoDB, Express.js, React.js, and Node.js
- [x] Clean code organization with separation of concerns
- [x] Responsive UI with good user experience
- [x]
