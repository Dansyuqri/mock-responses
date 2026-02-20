// Package mockresponses provides sarcastic, judgmental HTTP responses.
package mockresponses

import (
	"embed"
	"encoding/json"
	"math/rand/v2"
	"sort"
	"strconv"
	"strings"
)

//go:embed responses/*.json
var responsesFS embed.FS

// Response represents a sarcastic HTTP response.
type Response struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

var (
	responses      map[int][]string
	availableCodes []int
)

func init() {
	responses = make(map[int][]string)

	entries, err := responsesFS.ReadDir("responses")
	if err != nil {
		panic("mockresponses: failed to read embedded responses: " + err.Error())
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		name := entry.Name()
		if !strings.HasSuffix(name, ".json") {
			continue
		}

		codeStr := strings.TrimSuffix(name, ".json")
		code, err := strconv.Atoi(codeStr)
		if err != nil || code < 100 || code > 599 {
			continue
		}

		data, err := responsesFS.ReadFile("responses/" + name)
		if err != nil {
			continue
		}

		var messages []string
		if err := json.Unmarshal(data, &messages); err != nil || len(messages) == 0 {
			continue
		}

		responses[code] = messages
		availableCodes = append(availableCodes, code)
	}

	sort.Ints(availableCodes)
}

// GetResponse returns a random sarcastic Response for the given HTTP status
// code, or nil if the code is not available.
func GetResponse(statusCode int) *Response {
	messages, ok := responses[statusCode]
	if !ok {
		return nil
	}
	return &Response{
		Status:  statusCode,
		Message: messages[rand.IntN(len(messages))],
	}
}

// GetAvailableCodes returns a sorted slice of all available HTTP status codes.
func GetAvailableCodes() []int {
	result := make([]int, len(availableCodes))
	copy(result, availableCodes)
	return result
}
