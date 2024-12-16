# Library System

A Node.js application for managing library operations including books, borrowers, and borrowed books.

## Features

- Add, update, delete books and borrowers
- Borrow and return books
- Search books
- View overdue books

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- Docker & Docker Compose
- Winston for logging

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- Docker & Docker Compose (optional, for running PostgreSQL with Docker)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/library-system.git
   cd library-system
   ```

2. **Install dependencies:**

    ```
    npm install
    ```

3. **Set up environment variables:**

Create a .env file in the root directory with the following content:

```
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=library_db
DB_PORT=5432
NODE_ENV=development
PORT=5000
```

## Database Setup
You can run PostgreSQL locally or use Docker Compose.

**Using Docker Compose**

1. **Start the service:**

```
docker-compose up -d
```

2. **Update the .env file:**

Ensure your .env file matches the Docker Compose configuration:

```
DB_HOST=db
DB_USER=azooz
DB_PASSWORD=0000
DB_NAME=testdb
DB_PORT=5432
NODE_ENV=development
PORT=5000
```

Manually Setting Up PostgreSQL
Install PostgreSQL.

Create a database:

Update the .env file with your PostgreSQL credentials.

Running the Application
Start the server:

The API is now running at http://localhost:5000.



API Documentation
Borrowers
Add Borrower

URL: POST /borrowers/
Body Parameters:
firstName (string, required)
lastName (string, required)
email (string, required)
Response:
201 Created
Returns the created borrower object.
Get All Borrowers

URL: GET /borrowers/
Response:
200 OK
Returns a list of all borrowers.
Get Borrower by ID

URL: GET /borrowers/{id}
Response:
200 OK
Returns the borrower object.
Update Borrower

URL: PUT /borrowers/{id}
Body Parameters: Any updatable borrower fields.
Response:
200 OK
Returns the updated borrower object.
Delete Borrower

URL: DELETE /borrowers/{id}
Response:
204 No Content
Books
Add Book

URL: POST /books/
Body Parameters:
    - title (string, required)
    - author (string, required)
    - ISBN (string, required)
    - totalQuantity (integer, required)
    - availableQuantity (integer, required)
    - shelfLocation (string, required)
    - Response:
    - 201 Created
    - Returns the created book object.
    - Get All Books

URL: GET /books/
Response:
200 OK
Returns a list of all books.
Get Book by ID

URL: GET /books/{id}
Response:
200 OK
Returns the book object.
Update Book

URL: PUT /books/{id}
Body Parameters: Any updatable book fields.
Response:
200 OK
Returns the updated book object.
Delete Book

URL: DELETE /books/{id}
Response:
204 No Content
Search Books

URL: GET /books/search?title=&author=&ISBN=
Response:
200 OK
Returns a list of books matching the search criteria.
Borrowed Books
Checkout Book

URL: POST /book-borrowers/checkout
Body Parameters:
bookId (UUID, required)
borrowerId (UUID, required)
dueDate (date, required)
Response:
201 Created
Returns the borrowed book object.
Return Book

URL: PUT /book-borrowers/return/{id}
Response:
200 OK
Returns the updated borrowed book object.
Get Borrowed Books by Borrower ID

URL: GET /book-borrowers/borrower/{id}
Response:
200 OK
Returns a list of borrowed books for the borrower.
Get Overdue Books

URL: GET /book-borrowers/overdue
Response:
200 OK
Returns a list of overdue borrowed books.