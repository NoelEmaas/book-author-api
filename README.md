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
| Endpoint | Information |
| :--- | :--- |
| `GET /books` | Get all books. |
| `GET /books/:id` | Get specific book by ID. |
| `POST /books` | Create new book. |
| `PUT /books/:id` | Update existing book by ID. |
| `DELETE /books/:id` | Delete existing book by ID. |
| `POST /books/:id/authors` | Add author to a book by ID. |
| `DELETE /books/:id/authors` | Delete author from a book by ID. |

### Authors
| Endpoint | Information |
| :--- | :--- |
| `GET /authors` | Get all authors. |
| `GET /authors/:id` | Get specific author by ID. |
| `GET /authors/:id/books` | Get all authored books by author's ID. |
| `POST /authors` | Create new author. |
| `PUT /authors/:id` | Update existing author by ID. |
| `DELETE /authors/:id` | Delete existing author by ID. |


## Structure & Logic
![diagram-export-7-7-2024-11_07_19-PM](https://github.com/NoelEmaas/book-author-api/assets/90034393/603cb94c-dde3-4dd7-8047-dd8d295fa959)






