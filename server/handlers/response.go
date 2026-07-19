package handlers

import (
	"encoding/json"
	"net/http"
)

// JSONResponse writes JSON payload with HTTP status code
func JSONResponse(w http.ResponseWriter, statusCode int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(payload)
}
