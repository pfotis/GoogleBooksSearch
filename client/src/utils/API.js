import axios from "axios";

export default {
  getBook: function (query) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    return axios.get(url);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  // Get the saved a books from the database
  savedBooks: function () {
    return axios.get("/api/books");
  }
};