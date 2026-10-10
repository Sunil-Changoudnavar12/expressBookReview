// Run the Express server first with: npm start
const axios = require("axios");

const baseUrl = "http://localhost:3000";

async function showBooks(label, path) {
  try {
    const response = await axios.get(`${baseUrl}${path}`);
    console.log(`\n${label}:`);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(`${label} request failed:`, error.response?.data || error.message);
    process.exitCode = 1;
  }
}

async function getAllBooks() {
  await showBooks("All books", "/books");
}

async function getBookByISBN(isbn) {
  await showBooks("Book by ISBN", `/books/isbn/${encodeURIComponent(isbn)}`);
}

async function getBooksByAuthor(author) {
  await showBooks("Books by author", `/books/author/${encodeURIComponent(author)}`);
}

async function getBooksByTitle(title) {
  await showBooks("Books by title", `/books/title/${encodeURIComponent(title)}`);
}

async function main() {
  await getAllBooks();
  await getBookByISBN("9780131103627");
  await getBooksByAuthor("Brian W. Kernighan");
  await getBooksByTitle("Clean Code");
}

main().catch((error) => {
  console.error("Unexpected error:", error.message);
  process.exitCode = 1;
});
