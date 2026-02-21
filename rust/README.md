# mockeroo-mock-responses

Responses that mock you. A Rust crate that provides sarcastic, judgmental HTTP responses for use in your own applications.

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

```toml
# Cargo.toml
[dependencies]
mockeroo-mock-responses = "0.2"
```

## Usage

### `get_response(status_code)`

Returns a random sarcastic `Response` for the given HTTP status code, or `None` if unavailable.

```rust
use mockeroo_mock_responses::get_response;

if let Some(resp) = get_response(404) {
    println!("{} — {}", resp.status, resp.message);
    // 404 — Whatever you're looking for, it's not here. Just like my will to help you.
}

let missing = get_response(999);
// None
```

### `get_available_codes()`

Returns a sorted `Vec<u16>` of all supported HTTP status codes.

```rust
use mockeroo_mock_responses::get_available_codes;

println!("{:?}", get_available_codes());
// [200, 201, 204, 301, 302, 304, 400, 401, 403, 404, ...]
```

### Response struct

```rust
pub struct Response {
    pub status: u16,
    pub message: String,
}
```

### Full Example

```rust
use mockeroo_mock_responses::get_response;

fn handle_request(status_code: u16) -> (u16, String) {
    match get_response(status_code) {
        Some(resp) => (resp.status, resp.message),
        None => (404, "Status code not supported".to_string()),
    }
}

fn main() {
    let (status, message) = handle_request(500);
    println!("HTTP {}: {}", status, message);
}
```

## Available Status Codes

`200` `201` `204` `301` `302` `304` `400` `401` `403` `404` `405` `408` `409` `413` `418` `429` `500` `502` `503` `504`

Want more? [Contribute one!](https://github.com/mockeroo/mock-responses/blob/main/CONTRIBUTING.md)

## Contributing

The easiest way to contribute is by adding funny messages to files in the `responses/` directory. See [CONTRIBUTING.md](https://github.com/mockeroo/mock-responses/blob/main/CONTRIBUTING.md) for guidelines.

## License

MIT
