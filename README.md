# mock-responses

Responses that mock you back. Sarcastic, judgmental HTTP status responses for testing and development.

## Try It Live

A live server is available at **https://mock-server.mockeroo.workers.dev/**

```bash
curl https://mock-server.mockeroo.workers.dev/404
curl -i https://mock-server.mockeroo.workers.dev/500
```

Each endpoint returns the actual HTTP status code, so it works as a real mock server for testing error handling.

## Packages

| Language | Package | Docs |
|----------|---------|------|
| JavaScript | [`@mockeroo/mock-responses`](https://www.npmjs.com/package/@mockeroo/mock-responses) | [js/README.md](js/README.md) |
| Go | [`github.com/mockeroo/mock-response/go`](https://pkg.go.dev/github.com/mockeroo/mock-response/go) | [go/README.md](go/README.md) |
| Rust | [`mockeroo-mock-responses`](https://crates.io/crates/mockeroo-mock-responses) | [rust/README.md](rust/README.md) |
| Python | [`mockeroo-mock-responses`](https://pypi.org/project/mockeroo-mock-responses/) | [python/README.md](python/README.md) |
| PHP | [`mockeroo/mock-responses`](https://packagist.org/packages/mockeroo/mock-responses) | [php/README.md](php/README.md) |
| Java | [`com.mockeroo:mock-responses`](https://github.com/mockeroo/mock-responses/packages) | [java/README.md](java/README.md) |
| Ruby | [`mockeroo-mock-responses`](https://rubygems.org/gems/mockeroo-mock-responses) | [ruby/README.md](ruby/README.md) |

## Quick Start

**JavaScript**
```bash
npm install @mockeroo/mock-responses
```
```javascript
const { getResponse } = require('@mockeroo/mock-responses');
const resp = getResponse(404); // { status: 404, message: "..." }
```

**Go**
```bash
go get github.com/mockeroo/mock-response/go
```
```go
resp := mockresponse.GetResponse(404) // &Response{Status: 404, Message: "..."}
```

**Rust**
```toml
mockeroo-mock-responses = "0.1"
```
```rust
if let Some(resp) = get_response(404) { println!("{}", resp.message); }
```

**Python**
```bash
pip install mockeroo-mock-responses
```
```python
from mockeroo_mock_responses import get_response
resp = get_response(404)  # Response(status=404, message="...")
```

**PHP**
```bash
composer require mockeroo/mock-responses
```
```php
$resp = MockResponses::getResponse(404); // Response { status: 404, message: "..." }
```

**Java**
```xml
<dependency>
  <groupId>com.mockeroo</groupId>
  <artifactId>mock-responses</artifactId>
  <version>0.1.0</version>
</dependency>
```
```java
Response resp = MockResponses.getResponse(404); // Response { status=404, message="..." }
```

**Ruby**
```bash
gem install mockeroo-mock-responses
```
```ruby
resp = MockerooMockResponses.get_response(404) # #<Response status=404 message="...">
```

## Available Status Codes

`200` `201` `204` `301` `302` `304` `400` `401` `403` `404` `405` `408` `409` `413` `418` `429` `500` `502` `503` `504`

Want more? [Contribute one!](CONTRIBUTING.md)

## Project Structure

```
mock-responses/
├── responses/    # Canonical data — one JSON file per status code
├── js/           # npm package
├── go/           # Go module
├── rust/         # Rust crate
├── python/       # Python package
├── php/          # Composer package
├── java/         # Maven package (GitHub Packages)
└── ruby/         # Ruby gem
```

## Contributing

The easiest way to contribute is by adding funny messages to files in the `responses/` directory. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**TL;DR:** Edit a file in `responses/` (or create a new one), run `npm run validate`, open a PR.

## License

MIT
