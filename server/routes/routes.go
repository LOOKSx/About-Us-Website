package routes

import (
	"about-us-server/handlers"
	"net/http"
)

// SetupRoutes registers all API routes and returns the ServeMux
func SetupRoutes() *http.ServeMux {
	mux := http.NewServeMux()

	// API v1 Endpoints
	mux.HandleFunc("/api/v1/health", handlers.HealthHandler)
	mux.HandleFunc("/api/v1/profile", handlers.ProfileHandler)
	mux.HandleFunc("/api/v1/stats", handlers.StatsHandler)
	mux.HandleFunc("/api/v1/team", handlers.TeamHandler)
	mux.HandleFunc("/api/v1/services", handlers.ServicesHandler)
	mux.HandleFunc("/api/v1/timeline", handlers.TimelineHandler)
	mux.HandleFunc("/api/v1/testimonials", handlers.TestimonialsHandler)
	mux.HandleFunc("/api/v1/faqs", handlers.FAQsHandler)
	mux.HandleFunc("/api/v1/contact", handlers.ContactHandler)
	mux.HandleFunc("/api/v1/auth/login", handlers.LoginHandler)
	mux.HandleFunc("/api/v1/auth/register", handlers.RegisterHandler)
	mux.HandleFunc("/api/v1/auth/users", handlers.UsersListHandler)

	return mux
}
