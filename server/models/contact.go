package models

import "time"

// ContactSubmission represents a message sent from the contact form
type ContactSubmission struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Subject   string    `json:"subject"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
}

// ContactResponse represents standard response for contact submissions
type ContactResponse struct {
	Success string            `json:"status"`
	Message string            `json:"message"`
	Data    ContactSubmission `json:"data"`
}
