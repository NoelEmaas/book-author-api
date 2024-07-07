# Book-Author API
 Simple CRUD API built with NestJS to manage authors and books. The data is stored in memory using arrays and initialized from JSON files. This api doesn't perform CRUD operations directly in the JSON files but only manipulates the data from the array.



## Installation

```bash
$ git clone https://github.com/NoelEmaas/book-author-api.git
$ cd book-author-api
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage
The API exposes the following endpoints:

### Books
| Endpoint | Method | Request Body | Information |
| :--- | :--- | :--- | :--- |
| `/books` | GET | - | Get all books. |
| `/books/:id` | GET | - | Get specific book by ID. |
| `/books` | POST | `{ "title": "string", "description": "string", "authorIds": ["string"] }` | Create new book. |
| `/books/:id` | PUT | `{ "title": "string", "description": "string", "authorIds": ["string"] }` | Update existing book by ID. |
| `/books/:id` | DELETE | - | Delete existing book by ID. |
| `/books/:id/authors` | POST | `{ "authorId": "string" }` | Add author to a book by ID. |
| `/books/:id/authors` | DELETE | `{ "authorId": "string" }` | Delete author from a book by ID. |

### Authors
| Endpoint | Method | Request Body | Information |
| :--- | :--- | :--- | :--- |
| `/authors` | GET | - | Get all authors. |
| `/authors/:id` | GET | - | Get specific author by ID. |
| `/authors/:id/books` | GET | - | Get all authored books by author's ID. |
| `/authors` | POST | `{ "name": "string", "bio": "string" }` | Create new author. |
| `/authors/:id` | PUT | `{ "name": "string", "bio": "string" }` | Update existing author by ID. |
| `/authors/:id` | DELETE | - | Delete existing author by ID. |

## Structure & Logic
![diagram-export-7-7-2024-11_07_19-PM](https://github.com/NoelEmaas/book-author-api/assets/90034393/603cb94c-dde3-4dd7-8047-dd8d295fa959)






