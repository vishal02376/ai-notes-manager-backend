# AI-Powered Notes Manager - Backend

REST API built with Node.js, Express and MongoDB for managing notes, plus an AI endpoint (Google Gemini) that improves a note's content.

## Technologies Used

- Node.js
- Express 5
- MongoDB with Mongoose
- Google Gemini API (`@google/generative-ai`)
- dotenv, cors, nodemon (dev)

## Project Structure

```
backend/
├── server.js                    # Entry point: loads env, connects to MongoDB, starts server
├── .env                         # Environment variables (not committed)
└── src/
    ├── app.js                   # Express app: middleware and route mounting
    ├── config/db.js             # MongoDB connection
    ├── models/Note.js           # Note schema (title, content, createdDate, updatedDate)
    ├── controllers/
    │   ├── noteController.js    # Notes CRUD logic
    │   └── aiController.js      # Improve-note logic using Gemini
    ├── routes/
    │   ├── noteRoutes.js        # /web/api/notes routes
    │   └── aiRoutes.js          # /web/api/ai routes
    └── middleware/errorHandler.js   # 404 and error handling
```

## Setup

Prerequisites: Node.js 20+, a MongoDB database (local or MongoDB Atlas) and a Google Gemini API key.

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```

## Run the Project

```bash
npm run dev     # development, restarts on file changes (nodemon)
npm start       # production
```

The server runs at `http://localhost:5001`.

## API Endpoints

Base URL: `http://localhost:5001/web/api`

| Method | Endpoint | Body | Description |
|---|---|---|---|
| GET | `/notes` | - | Get all notes (newest first) |
| POST | `/notes` | `{ "title", "content" }` | Create a note |
| PUT | `/notes/:id` | `{ "title", "content" }` | Update a note |
| DELETE | `/notes/:id` | - | Delete a note |
| POST | `/ai/improve-note` | `{ "content" }` | Return an improved version of the text |

Example:

```bash
curl -X POST http://localhost:5001/web/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Meeting","content":"meeting with client tomorrow discuss project"}'
```

Success response:

```json
{ "success": true, "data": { "_id": "...", "title": "Meeting", "content": "...", "createdDate": "...", "updatedDate": "..." } }
```

Error response:

```json
{ "success": false, "message": "Note validation failed: title: Title is required" }
```

`/ai/improve-note` only returns the improved text. It does not save anything to the database. The frontend places the text in the form, and the note is saved when the user submits it.

## Validation and Error Handling

- `title` and `content` are required (Mongoose schema validation), otherwise the API returns `400`
- Unknown note id on update or delete returns `404`
- Empty `content` on the AI endpoint returns `400`
- Unmatched routes return `404`
- All other errors return `500`
- Every error uses the same JSON shape: `{ success: false, message }`
