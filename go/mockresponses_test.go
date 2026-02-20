package mockresponses_test

import (
	"testing"

	mockresponses "github.com/mockeroo/mock-response/go"
)

func TestGetResponse_ValidCode(t *testing.T) {
	result := mockresponses.GetResponse(404)
	if result == nil {
		t.Fatal("expected non-nil response for 404")
	}
	if result.Status != 404 {
		t.Errorf("expected status 404, got %d", result.Status)
	}
	if result.Message == "" {
		t.Error("expected non-empty message")
	}
}

func TestGetResponse_UnknownCode(t *testing.T) {
	if result := mockresponses.GetResponse(999); result != nil {
		t.Errorf("expected nil for unknown code 999, got %+v", result)
	}
}

func TestGetResponse_AllAvailableCodes(t *testing.T) {
	for _, code := range mockresponses.GetAvailableCodes() {
		result := mockresponses.GetResponse(code)
		if result == nil {
			t.Errorf("GetResponse(%d) returned nil", code)
			continue
		}
		if result.Status != code {
			t.Errorf("GetResponse(%d): expected status %d, got %d", code, code, result.Status)
		}
		if result.Message == "" {
			t.Errorf("GetResponse(%d): expected non-empty message", code)
		}
	}
}

func TestGetAvailableCodes_NonEmpty(t *testing.T) {
	codes := mockresponses.GetAvailableCodes()
	if len(codes) == 0 {
		t.Fatal("expected non-empty list of codes")
	}
}

func TestGetAvailableCodes_Sorted(t *testing.T) {
	codes := mockresponses.GetAvailableCodes()
	for i := 1; i < len(codes); i++ {
		if codes[i] <= codes[i-1] {
			t.Errorf("codes not sorted at index %d: %d <= %d", i, codes[i], codes[i-1])
		}
	}
}

func TestGetAvailableCodes_ReturnsCopy(t *testing.T) {
	codes := mockresponses.GetAvailableCodes()
	if len(codes) == 0 {
		t.Skip("no codes available")
	}
	original := codes[0]
	codes[0] = 0
	fresh := mockresponses.GetAvailableCodes()
	if fresh[0] != original {
		t.Error("GetAvailableCodes returned a reference to the internal slice, not a copy")
	}
}
