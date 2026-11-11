package httpapi

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthReturnsServiceStatus(t *testing.T) {
	handler := NewHandler("http://localhost:5173")
	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status %d, got %d", http.StatusOK, rec.Code)
	}
	if got := rec.Header().Get("Content-Type"); got != "application/json; charset=utf-8" {
		t.Fatalf("unexpected Content-Type: %q", got)
	}

	var body healthResponse
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatalf("decode health response: %v", err)
	}
	if body.Status != "ok" || body.Service != "gapwise-api" {
		t.Fatalf("unexpected health response: %+v", body)
	}
}

func TestHealthAllowsConfiguredFrontendOrigin(t *testing.T) {
	const origin = "http://localhost:5173"
	handler := NewHandler(origin)
	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	req.Header.Set("Origin", origin)
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	if got := rec.Header().Get("Access-Control-Allow-Origin"); got != origin {
		t.Fatalf("expected CORS origin %q, got %q", origin, got)
	}
}

func TestHealthDoesNotAllowUnknownOrigin(t *testing.T) {
	handler := NewHandler("http://localhost:5173")
	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	req.Header.Set("Origin", "https://example.com")
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	if got := rec.Header().Get("Access-Control-Allow-Origin"); got != "" {
		t.Fatalf("unexpected CORS origin: %q", got)
	}
}
