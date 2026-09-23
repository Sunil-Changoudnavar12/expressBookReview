# Online Book Review Application

This is a beginner-friendly backend REST API built with Node.js and Express.js. It allows users to view books, search by ISBN/author/title, register/login, and add, modify, or delete their own book reviews.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON
- Express Session
- JWT
- cURL
- Postman

## Project Structure

```text
OnlineBookReview/
├── index.js
├── booksdb.js
├── users.js
├── reviews.js
├── package.json
├── middleware/
│   ├── auth.js
│   └── jwt.js
├── router/
│   ├── general.js
│   ├── auth_users.js
│   └── auth_reviewer.js
├── output/
│   ├── getallbooks
│   ├── getbooksbyISBN
│   ├── getbooksbyauthor
│   ├── getbooksbytitle
│   ├── getbookreview
│   ├── register
│   ├── login
│   ├── addreview
│   ├── modifyreview
│   └── deletereview
└── README.md
```

## Installation

```bash
npm install
```

## Start the Server

```bash
npm start
```

For development:

```bash
npm run dev
```

## API Endpoints

### Books

- `GET /books` – retrieve all books
- `GET /books/isbn/:isbn` – search book by ISBN
- `GET /books/author/:author` – search books by author
- `GET /books/title/:title` – search books by title
- `GET /books/:isbn/reviews` – get reviews for a book

### Authentication

- `POST /register` – create a new user
- `POST /login` – login and get JWT token

### Reviews

- `POST /books/:isbn/reviews` – add a review
- `PUT /books/:isbn/reviews` – modify your review
- `DELETE /books/:isbn/reviews` – delete your review

## Authentication

This project uses two types of authentication:

1. Session authentication using Express Session.
2. JWT authentication using a bearer token in the `Authorization` header.

Protected review routes require a valid user session and/or JWT token.

## Example cURL Requests

### Get all books

```bash
curl http://localhost:3000/books
```

### Register a user

```bash
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d "{\"username\":\"john\",\"password\":\"password123\"}"
```

### Login

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{\"username\":\"john\",\"password\":\"password123\"}"
```

### Add review

```bash
curl -X POST http://localhost:3000/books/9780131103627/reviews -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d "{\"review\":\"Great book for beginners.\"}"
```

## Testing

Use Postman or cURL to test all endpoints. Make sure to include the correct JSON body and headers.

## Notes

- Passwords are not exposed in API responses.
- Review ownership is checked before update or delete.
- Invalid credentials and unauthorized actions return proper JSON error responses.
