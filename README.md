# mock-responses

Like Mockoon, but worse.

A server that mocks **you**. Returns real HTTP status codes with sarcastic, judgmental messages — perfect for developers who want their error responses to hurt a little.

## npm Package

Install it and use it in your own server:

```bash
npm install mock-responses
```

### `getResponse(statusCode)`

Returns a random sarcastic `{ status, message }` for the given HTTP status code, or `null` if unavailable.

```javascript
const { getResponse } = require('mock-responses');

const result = getResponse(404);
// { status: 404, message: "Whatever you're looking for, it's not here. Just like my will to help you." }

const missing = getResponse(999);
// null
```

### `getAvailableCodes()`

Returns a sorted array of all available HTTP status codes.

```javascript
const { getAvailableCodes } = require('mock-responses');

console.log(getAvailableCodes());
// [200, 201, 204, 301, 302, 304, 400, 401, 403, 404, ...]
```

### `middleware()`

Returns an Express router you can mount at any path:

```javascript
const express = require('express');
const { middleware } = require('mock-responses');

const app = express();
app.use('/mock', middleware());
app.listen(3000);
```

This gives you:
- `GET /mock/` — project info and available codes
- `GET /mock/:statusCode` — sarcastic response with the real HTTP status code

## Hosted API

**Base URL:** `http://localhost:3000` (or wherever you deploy it)

**Method:** `GET`

**Rate Limit:** 120 requests/minute per IP

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | Returns available status codes and usage info |
| `GET /:statusCode` | Returns the real HTTP status code with a random snarky message |

### Example Request

```
GET /404
```

### Example Response

```json
{
  "status": 404,
  "message": "Whatever you're looking for, it's not here. Just like my will to help you."
}
```

The response actually comes back with HTTP status 404 — so it works as a real mock endpoint for testing how your app handles different status codes. Except now the errors are personal.

### Available Status Codes

`200` `201` `204` `301` `302` `304` `400` `401` `403` `404` `405` `408` `409` `413` `418` `429` `500` `502` `503` `504`

Want more? [Contribute one!](CONTRIBUTING.md)

## Self-Hosting

```bash
git clone https://github.com/Dansyuqri/mock-responses.git
cd mock-responses
npm install
npm start
```

Or with Docker:

```bash
docker build -t mock-responses .
docker run -p 3000:3000 mock-responses
```

## Project Structure

```
mock-responses/
├── lib.js              # Core library (getResponse, getAvailableCodes, middleware)
├── index.js            # Standalone Express server
├── responses/          # Sarcastic messages, one file per status code
│   ├── 200.json
│   ├── 404.json
│   ├── 500.json
│   └── ...
├── validate.js         # Validates responses/ for contributors
├── package.json        # Dependencies and scripts
├── Dockerfile          # Production container
├── CONTRIBUTING.md     # How to add responses
├── CLAUDE.md           # AI assistant guidance
├── LICENSE             # MIT
└── README.md           # You are here
```

## Contributing

The easiest way to contribute is by adding funny messages to files in the `responses/` directory. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**TL;DR:** Edit a file in `responses/` (or create a new one), run `npm run validate`, open a PR.

## License

MIT
