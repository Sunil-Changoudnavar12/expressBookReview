const express = require("express");
const session = require("express-session");

const generalRoutes = require("./router/general");
const authUserRoutes = require("./router/auth_users");
const reviewerRoutes = require("./router/auth_reviewer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: "online-book-review-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "lax",
    },
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Online Book Review Application is running!",
    endpoints: {
      books: "/books",
      isbn: "/books/isbn/:isbn",
      author: "/books/author/:author",
      title: "/books/title/:title",
      reviews: "/books/:isbn/reviews",
      register: "POST /register",
      login: "POST /login",
      addReview: "POST /books/:isbn/reviews",
      updateReview: "PUT /books/:isbn/reviews",
      deleteReview: "DELETE /books/:isbn/reviews",
    },
  });
});

app.use(generalRoutes);
app.use(authUserRoutes);
app.use(reviewerRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
