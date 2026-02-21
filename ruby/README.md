# mockeroo-mock-responses (Ruby)

Sarcastic HTTP status code responses for testing and development.

```ruby
require 'mockeroo_mock_responses'

resp = MockerooMockResponses.get_response(404)
puts "#{resp.status}: #{resp.message}"
# => 404: Whatever you're looking for, it's not here. Just like my will to help you.

codes = MockerooMockResponses.get_available_codes
puts codes.inspect
# => [200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 413, 418, 429, 500, 502, 503, 504]
```

## Installation

```bash
gem install mockeroo-mock-responses
```

Or add to your Gemfile:

```ruby
gem 'mockeroo-mock-responses'
```

## API

### `MockerooMockResponses.get_response(status_code) -> Response | nil`

Returns a `Response` struct with `.status` (Integer) and `.message` (String), or `nil`
if the status code is not recognised.  Each call picks a random message from the pool.

### `MockerooMockResponses.get_available_codes -> Array<Integer>`

Returns all supported HTTP status codes in ascending order.  Each call returns a new
array; mutating it has no effect on the library state.

## Running tests

```bash
cd ruby
ruby test/test_mockeroo_mock_responses.rb
```

## License

MIT
