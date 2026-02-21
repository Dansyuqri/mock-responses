# mock-response/go

Responses that mock you. A Go module that provides sarcastic, judgmental HTTP responses for use in your own applications.

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
go get github.com/mockeroo/mock-response/go
```

## Usage

### `GetResponse(statusCode)`

Returns a random sarcastic `*Response` for the given HTTP status code, or `nil` if unavailable.

```go
import mockresponse "github.com/mockeroo/mock-response/go"

resp := mockresponse.GetResponse(404)
if resp != nil {
    fmt.Println(resp.Status, resp.Message)
    // 404 Whatever you're looking for, it's not here. Just like my will to help you.
}

missing := mockresponse.GetResponse(999)
// nil
```

### `GetAvailableCodes()`

Returns a sorted `[]int` of all supported HTTP status codes.

```go
import mockresponse "github.com/mockeroo/mock-response/go"

codes := mockresponse.GetAvailableCodes()
fmt.Println(codes)
// [200 201 204 301 302 304 400 401 403 404 ...]
```

### Response struct

```go
type Response struct {
    Status  int
    Message string
}
```

### Full Example

```go
package main

import (
    "encoding/json"
    "net/http"
    "strconv"

    mockresponse "github.com/mockeroo/mock-response/go"
)

func main() {
    http.HandleFunc("/mock/", func(w http.ResponseWriter, r *http.Request) {
        codeStr := r.URL.Path[len("/mock/"):]
        code, err := strconv.Atoi(codeStr)
        if err != nil {
            http.Error(w, "invalid status code", http.StatusBadRequest)
            return
        }

        resp := mockresponse.GetResponse(code)
        if resp == nil {
            http.Error(w, "unsupported status code", http.StatusNotFound)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(resp.Status)
        json.NewEncoder(w).Encode(resp)
    })

    http.ListenAndServe(":8080", nil)
}
```

## Available Status Codes

`200` `201` `204` `301` `302` `304` `400` `401` `403` `404` `405` `408` `409` `413` `418` `429` `500` `502` `503` `504`

Want more? [Contribute one!](https://github.com/mockeroo/mock-responses/blob/main/CONTRIBUTING.md)

## Contributing

The easiest way to contribute is by adding funny messages to files in the `responses/` directory. See [CONTRIBUTING.md](https://github.com/mockeroo/mock-responses/blob/main/CONTRIBUTING.md) for guidelines.

## License

MIT
