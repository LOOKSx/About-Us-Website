package handlers

import (
	"about-us-server/models"
	"about-us-server/store"
	"encoding/json"
	"net/http"
)

// ContactHandler handles contact form submission
func ContactHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		JSONResponse(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
		return
	}

	var req struct {
		Name    string `json:"name"`
		Email   string `json:"email"`
		Subject string `json:"subject"`
		Message string `json:"message"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		JSONResponse(w, http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
		return
	}

	if req.Name == "" || req.Email == "" || req.Message == "" {
		JSONResponse(w, http.StatusBadRequest, map[string]string{"error": "Name, Email, and Message are required fields"})
		return
	}

	sub := store.Instance.AddContact(req.Name, req.Email, req.Subject, req.Message)

	res := models.ContactResponse{
		Success: "success",
		Message: "Thank you for reaching out! We received your message and will respond shortly.",
		Data:    sub,
	}
	JSONResponse(w, http.StatusCreated, res)
}
