package handlers

import (
	"about-us-server/store"
	"net/http"
)

// ServicesHandler returns services list
func ServicesHandler(w http.ResponseWriter, r *http.Request) {
	JSONResponse(w, http.StatusOK, store.Instance.Services)
}

// TimelineHandler returns milestones
func TimelineHandler(w http.ResponseWriter, r *http.Request) {
	JSONResponse(w, http.StatusOK, store.Instance.Timeline)
}

// TestimonialsHandler returns testimonials
func TestimonialsHandler(w http.ResponseWriter, r *http.Request) {
	JSONResponse(w, http.StatusOK, store.Instance.Testimonials)
}

// FAQsHandler returns FAQ items
func FAQsHandler(w http.ResponseWriter, r *http.Request) {
	JSONResponse(w, http.StatusOK, store.Instance.FAQs)
}
