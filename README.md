# apiAssesment

A simple RESTful API built with Node.js, Express, and MongoDB.

## Features

- User authentication and registration
- CRUD operations for posts
- Commenting system for posts
- Comments are shown with parent post
- Category management
- Filter posts by user or category
- Each post can have multiple categories and associated comments

## Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login

### Users
- `GET /api/users/:id` — Get user by ID
- `PUT /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user

### Posts
- `POST /api/posts` — Create a post
- `GET /api/posts` — Get all posts (supports `?user=username`)
- `GET /api/posts/:id` — Get a post by ID (with comments)
- `PUT /api/posts/:id` — Update a post
- `DELETE /api/posts/:id` — Delete a post

### Comments
- `POST /api/comments` — Add a comment to a post
- `GET /api/comments/:postId` — Get comments for a post



## Example Post JSON

```json
{
  "title": "Sample Post",
  "desc": "This is a sample post.",
  "username": "johndoe",
  "categories": ["literature", "art"]
}
```

## Example Comment JSON

```json
{
  "postId": "POST_OBJECT_ID",
  "username": "janedoe",
  "text": "Great post!"
}
```

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Set up your `.env` file with your MongoDB connection string refer to `.env.example`
4. Run `npm start`
