package handlers

import (
	"about-us-server/models"
	"about-us-server/store"
	"net/http"
	"time"
)

// HealthHandler returns live status & uptime
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	st := store.Instance
	uptime := int64(time.Since(st.StartTime).Seconds())
	res := models.HealthResponse{
		Status:    "OK",
		Message:   "Golang Backend REST API is running smoothly",
		Version:   "1.0.0",
		Timestamp: time.Now(),
		UptimeSec: uptime,
	}
	JSONResponse(w, http.StatusOK, res)
}
