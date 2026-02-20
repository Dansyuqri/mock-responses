# mock-responses

Like Mockoon, but worse.

Responses that mock you. An npm package that provides sarcastic, judgmental HTTP responses you can mount in your own Express app.

## Try It Live

A live server is available at **https://mock-server.dansyuqri.workers.dev/**

```bash
curl https://mock-server.dansyuqri.workers.dev/404
curl https://mock-server.dansyuqri.workers.dev/500
curl -i https://mock-server.dansyuqri.workers.dev/418
```

Each endpoint returns the actual HTTP status code, so it works as a real mock server for testing error handling.

## Installation

```bash
npm install @mockeroo/mock-responses
```

### `getResponse(statusCode)`

Returns a random sarcastic `{ status, message }` for the given HTTP status code, or `null` if unavailable.

```javascript
const { getResponse } = require('@mockeroo/mock-responses');

const result = getResponse(404);
// { status: 404, message: "Whatever you're looking for, it's not here. Just like my will to help you." }

const missing = getResponse(999);
// null
```

### `getAvailableCodes()`

Returns a sorted array of all available HTTP status codes.

```javascript
const { getAvailableCodes } = require('@mockeroo/mock-responses');

console.log(getAvailableCodes());
// [200, 201, 204, 301, 302, 304, 400, 401, 403, 404, ...]
```

### `middleware()`

Returns an Express router you can mount at any path:

```javascript
const express = require('express');
const { middleware } = require('@mockeroo/mock-responses');

const app = express();
app.use('/mock', middleware());
app.listen(3000);
// GET /mock/404 → { status: 404, message: "..." }
```

---

## Available Status Codes

`200` `201` `204` `301` `302` `304` `400` `401` `403` `404` `405` `408` `409` `413` `418` `429` `500` `502` `503` `504`

Want more? [Contribute one!](CONTRIBUTING.md)

---

## Example Response

```json
{
  "status": 404,
  "message": "Whatever you're looking for, it's not here. Just like my will to help you."
}
```

---

## Project Structure

```
mock-responses/
├── responses/          # Sarcastic messages, one file per status code
│   ├── 200.json
│   ├── 404.json
│   ├── 500.json
│   └── ...
├── js/                 # JavaScript/npm package (@mockeroo/mock-responses)
│   ├── lib.js
│   ├── validate.js
│   ├── __tests__/
│   └── package.json
├── CONTRIBUTING.md
└── README.md
```

## Contributing

The easiest way to contribute is by adding funny messages to files in the `responses/` directory. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**TL;DR:** Edit a file in `responses/` (or create a new one), run `cd js && npm run validate`, open a PR.

## License

MIT
