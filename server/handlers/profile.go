package handlers

import (
	"about-us-server/models"
	"about-us-server/store"
	"net/http"
	"strings"
)

// ProfileHandler returns profile info
func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	JSONResponse(w, http.StatusOK, store.Instance.Profile)
}

// StatsHandler returns company/personal metrics
func StatsHandler(w http.ResponseWriter, r *http.Request) {
	JSONResponse(w, http.StatusOK, store.Instance.Stats)
}

// TeamHandler returns list of team members (supports ?dept= filter)
func TeamHandler(w http.ResponseWriter, r *http.Request) {
	deptFilter := r.URL.Query().Get("dept")
	team := store.Instance.Team

	if deptFilter == "" || strings.EqualFold(deptFilter, "all") {
		JSONResponse(w, http.StatusOK, team)
		return
	}

	var filtered []models.TeamMember
	for _, member := range team {
		if strings.EqualFold(member.Department, deptFilter) {
			filtered = append(filtered, member)
		}
	}
	JSONResponse(w, http.StatusOK, filtered)
}
