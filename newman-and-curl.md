# Bookshelf API Testing with cURL and Newman

This document provides instructions on how to test the Bookshelf API using cURL commands for manual testing and Newman for automated testing.

## cURL Commands

### Reading Books

```bash
# GET all books
curl -X GET "http://localhost:9000/books" -H "accept: application/json"

# GET book by id
curl -X GET "http://localhost:9000/books/{bookId}" -H "accept: application/json"
```

### Managing Books

```bash
# POST a new book
curl -X POST "http://localhost:9000/books" \
    -H "Content-Type: application/json" \
    -d '{"name": "Book Title", "year": 2023, "author": "Author Name", "summary": "Book summary", "publisher": "Publisher Name", "pageCount": 200, "readPage": 50, "reading": true}'

# PUT update a book
curl -X PUT "http://localhost:9000/books/{bookId}" \
    -H "Content-Type: application/json" \
    -d '{"name": "Updated Book Title", "year": 2023, "author": "Author Name", "summary": "Updated summary", "publisher": "Publisher Name", "pageCount": 200, "readPage": 75, "reading": true}'

# DELETE a book
curl -X DELETE "http://localhost:9000/books/{bookId}"
```

## Automated Testing with Newman

For automated testing of the entire API, use the Newman command below:

```bash
# Run the Newman test command for the Bookshelf API
newman run Bookshelf-API-Test.postman_collection.json --environment Bookshelf-API-Test.postman_environment.json
```
