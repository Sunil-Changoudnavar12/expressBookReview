// Run the Express server first with: npm start
const axios = require("axios");

const baseUrl = "http://localhost:3000";

async function show(label, path) {
  const response = await axios.get(`${baseUrl}${path}`);
  console.log(`\n${label}`);
  console.log(JSON.stringify(response.data, null, 2));
}

async function main() {
  try {
    await show("All books", "/books");
    await show("Book by ISBN", "/books/isbn/9780131103627");
    await show("Books by author", "/books/author/Brian%20W.%20Kernighan");
    await show("Books by title", "/books/title/Clean%20Code");
    await show("Book reviews", "/review/9780131103627");
  } catch (error) {
    console.error("Request failed:", error.response?.data || error.message);
    process.exitCode = 1;
  }
}

main();
