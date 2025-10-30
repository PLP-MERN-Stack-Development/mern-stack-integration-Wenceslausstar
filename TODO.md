# TODO: MERN Stack Blog Application Development

## Task 1: Project Setup

- [x] Fix MongoDB Connection Issue
  - [x] Update server/server.js to use `process.env.MONGO_URI` instead of `process.env.MONGODB_URI` in mongoose.connect()
  - [x] Restart the server to test the MongoDB connection
  - [x] Verify connection logs ("Connected to MongoDB") and check for any remaining errors
  - [ ] If URI space in .env causes issues, manually fix .env (remove space in URI)
- [ ] Set up Express.js server with necessary middleware
- [ ] Create a React front-end using Vite and configure proxy for API calls
- [ ] Implement environment variables for configuration management

## Task 2: Back-End Development

- [ ] Design and implement a RESTful API for a blog application with the following endpoints:
  - [ ] GET /api/posts: Get all blog posts
  - [ ] GET /api/posts/:id: Get a specific blog post
  - [ ] POST /api/posts: Create a new blog post
  - [ ] PUT /api/posts/:id: Update an existing blog post
  - [ ] DELETE /api/posts/:id: Delete a blog post
  - [ ] GET /api/categories: Get all categories
  - [ ] POST /api/categories: Create a new category
- [ ] Create Mongoose models for Post and Category with proper relationships
- [ ] Implement input validation using a library like Joi or express-validator
- [ ] Add error handling middleware for API routes

## Task 3: Front-End Development

- [ ] Create React components for:
  - [ ] Post list view
  - [ ] Single post view
  - [ ] Create/edit post form
  - [ ] Navigation and layout
- [ ] Implement React Router for navigation between different views
- [ ] Use React hooks for state management (useState, useEffect, useContext)
- [ ] Create a custom hook for API calls

## Task 4: Integration and Data Flow

- [ ] Implement API service in React to communicate with the back-end
- [ ] Set up state management for posts and categories
- [ ] Create forms with proper validation for creating and editing posts
- [ ] Implement optimistic UI updates for better user experience
- [ ] Handle loading and error states for API calls

## Task 5: Advanced Features

- [ ] Add user authentication (registration, login, protected routes)
- [ ] Implement image uploads for blog post featured images
- [ ] Add pagination for the post list
- [ ] Implement searching and filtering functionality
- [ ] Add comments feature for blog posts

## Expected Outcome

- [ ] A fully functional MERN stack blog application
- [ ] Proper integration between MongoDB, Express.js, React.js, and Node.js
- [ ] Clean code organization with separation of concerns
- [ ] Responsive UI with good user experience
- [ ] Implementation of at least one advanced feature
