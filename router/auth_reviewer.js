const express = require("express");
const books = require("../booksdb");
const reviews = require("../reviews");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/books/:isbn/reviews", authMiddleware, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body || {};
  const book = books.find((item) => item.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Book not found." });
  }

  if (!review || !review.trim()) {
    return res.status(400).json({ error: "Please provide a valid review text." });
  }

  if (!reviews[isbn]) {
    reviews[isbn] = [];
  }

  const existingReview = reviews[isbn].find(
    (item) => item.username === req.user.username
  );

  if (existingReview) {
    return res.status(400).json({ error: "You have already reviewed this book." });
  }

  const reviewEntry = {
    username: req.user.username,
    review: review.trim(),
  };

  reviews[isbn].push(reviewEntry);

  return res.status(201).json({
    message: "Review added successfully.",
    review: reviewEntry,
  });
});

router.put("/books/:isbn/reviews", authMiddleware, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body || {};
  const book = books.find((item) => item.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Book not found." });
  }

  if (!review || !review.trim()) {
    return res.status(400).json({ error: "Please provide a valid review text." });
  }

  const bookReviews = reviews[isbn] || [];
  const myReview = bookReviews.find((item) => item.username === req.user.username);

  if (!myReview) {
    return res.status(403).json({ error: "You do not have a review for this book to update." });
  }

  myReview.review = review.trim();

  return res.status(200).json({
    message: "Review updated successfully.",
    review: myReview,
  });
});

router.delete("/books/:isbn/reviews", authMiddleware, (req, res) => {
  const { isbn } = req.params;
  const book = books.find((item) => item.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Book not found." });
  }

  const bookReviews = reviews[isbn] || [];
  const myReviewIndex = bookReviews.findIndex(
    (item) => item.username === req.user.username
  );

  if (myReviewIndex === -1) {
    return res.status(403).json({ error: "You do not have a review for this book to delete." });
  }

  const deletedReview = bookReviews.splice(myReviewIndex, 1)[0];

  if (bookReviews.length === 0) {
    delete reviews[isbn];
  }

  return res.status(200).json({
    message: "Review deleted successfully.",
    deletedReview,
  });
});

module.exports = router;
