const express = require("express");
const books = require("../booksdb");
const reviews = require("../reviews");

const router = express.Router();

router.get("/books", (req, res) => {
  res.status(200).json(books);
});

router.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn.trim();
  const result = books.filter((book) => book.isbn === isbn);

  if (result.length === 0) {
    return res.status(404).json({ error: "Book not found for the given ISBN." });
  }

  return res.status(200).json(result);
});

router.get("/books/author/:author", (req, res) => {
  const author = req.params.author.trim().toLowerCase();
  const result = books.filter((book) =>
    book.author.toLowerCase().includes(author)
  );

  if (result.length === 0) {
    return res.status(404).json({ error: "No books found for that author." });
  }

  return res.status(200).json(result);
});

router.get("/books/title/:title", (req, res) => {
  const title = req.params.title.trim().toLowerCase();
  const result = books.filter((book) =>
    book.title.toLowerCase().includes(title)
  );

  if (result.length === 0) {
    return res.status(404).json({ error: "No books found with that title." });
  }

  return res.status(200).json(result);
});

router.get("/books/:isbn/reviews", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((item) => item.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Book not found." });
  }

  const bookReviews = reviews[isbn] || [];

  return res.status(200).json({
    isbn,
    title: book.title,
    reviews: bookReviews,
  });
});

module.exports = router;
