# mockeroo-mock-responses

Responses that mock you. A Python package that provides sarcastic, judgmental HTTP responses for use in your own applications.

## Try It Live

A live server is available at **https://mock-server.mockeroo.workers.dev/**

```bash
# Project info and available status codes
curl https://mock-server.mockeroo.workers.dev/

# Get a sarcastic 404
curl https://mock-server.mockeroo.workers.dev/404

# Or use it as a real mock endpoint in your tests
curl -i https://mock-server.mockeroo.workers.dev/418
```

## Installation

```bash
pip install mockeroo-mock-responses
```

## Usage

### `get_response(status_code)`

Returns a random sarcastic `Response` for the given HTTP status code, or `None` if unavailable.

```python
from mockeroo_mock_responses import get_response

resp = get_response(404)
if resp is not None:
    print(resp.status, resp.message)
    # 404 Whatever you're looking for, it's not here. Just like my will to help you.

missing = get_response(999)
# None
```

### `get_available_codes()`

Returns a sorted list of all supported HTTP status codes.

```python
from mockeroo_mock_responses import get_available_codes

print(get_available_codes())
# [200, 201, 204, 301, 302, 304, 400, 401, 403, 404, ...]
```

### Response dataclass

```python
@dataclass
class Response:
    status: int
    message: str
```

### Full Example

```python
from http.server import BaseHTTPRequestHandler, HTTPServer
from mockeroo_mock_responses import get_response
import json

class MockHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path.lstrip('/')
        try:
            code = int(path)
        except ValueError:
            self.send_error(400, "Invalid status code")
            return

        resp = get_response(code)
        if resp is None:
            self.send_error(404, "Status code not supported")
            return

        body = json.dumps({"status": resp.status, "message": resp.message}).encode()
        self.send_response(resp.status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(body)

if __name__ == "__main__":
    HTTPServer(("", 8080), MockHandler).serve_forever()
```

## Available Status Codes

`200` `201` `204` `301` `302` `304` `400` `401` `403` `404` `405` `408` `409` `413` `418` `429` `500` `502` `503` `504`

Want more? [Contribute one!](https://github.com/mockeroo/mock-responses/blob/main/CONTRIBUTING.md)

## Contributing

The easiest way to contribute is by adding funny messages to files in the `responses/` directory. See [CONTRIBUTING.md](https://github.com/mockeroo/mock-responses/blob/main/CONTRIBUTING.md) for guidelines.

## License

MIT
