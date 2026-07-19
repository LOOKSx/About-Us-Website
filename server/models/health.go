package models

import "time"

// HealthResponse represents backend API health check info
type HealthResponse struct {
	Status    string    `json:"status"`
	Message   string    `json:"message"`
	Version   string    `json:"version"`
	Timestamp time.Time `json:"timestamp"`
	UptimeSec int64     `json:"uptime_seconds"`
}
