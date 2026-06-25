# CodeVector Product Listing API

## Overview

This project is a backend API built as part of the CodeVector Backend Internship assignment.

The application supports browsing a large product catalog with the following features:

* Product listing
* Category filtering
* Cursor-based pagination
* Efficient querying for large datasets
* Bulk data generation using a seed script

The API is designed to handle approximately 200,000 products while maintaining consistent pagination even when new products are added or updated.

---

## Tech Stack

* Node.js
* TypeScript
* Express.js
* MongoDB Atlas
* Mongoose

---

## Project Structure

```text
src
├── config
├── controllers
├── models
├── routes
├── scripts
├── utils
├── app.ts
└── server.ts
```

---

## Installation

Clone the repository.

git clone <repository-url>
```

Install dependencies.

npm install
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

---

## Running the Application

Development mode

npm run dev
```

Production build

npm run build
npm start
```

---

## Seeding the Database

The project includes a seed script that generates approximately 200,000 products using batch insertion.

npm run seed
```

---

## API Endpoints

### Health Check

```http
GET /
```

---

### Get Products

```http
GET /api/products
```

Query Parameters

| Parameter | Description                                              |
| --------- | -------------------------------------------------------- |
| category  | Filter products by category                              |
| limit     | Number of products to return (default: 20, maximum: 100) |
| cursor    | Base64 encoded pagination cursor                         |

Example

```http
GET /api/products?category=Electronics&limit=20
```

---

## Pagination

This project uses **cursor-based pagination** instead of offset-based (`skip`) pagination.

The cursor contains:

* `updatedAt`
* `_id`

This approach prevents duplicate or missing records when products are inserted or updated while users are browsing.

---

## Database Design

Each product contains:

* name
* category
* price
* createdAt
* updatedAt

Indexes:

* `{ updatedAt: -1, _id: -1 }`
* `{ category: 1, updatedAt: -1, _id: -1 }`

These indexes optimize sorting, filtering, and cursor-based pagination.

---

## Design Decisions

* TypeScript for type safety.
* Cursor-based pagination for consistency and scalability.
* Batch insertion using `insertMany()` for efficient database seeding.
* Modular project structure separating routes, controllers, models, configuration, and utilities.

---

## Future Improvements

* Request validation
* Unit and integration tests
* API documentation using Swagger/OpenAPI
* Docker support
* Search functionality
* Product creation and update endpoints
