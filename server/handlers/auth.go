package handlers

import (
	"about-us-server/models"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"
)

var (
	usersLock sync.RWMutex
	userStore = []models.UserAccount{
		{
			ID:        "usr-admin-1",
			Name:      "ผู้ดูแลระบบ (Super Admin)",
			Username:  "admin",
			Email:     "admin@phuttiphong.com",
			Password:  "admin1234",
			Role:      "admin",
			CreatedAt: "2026-07-19T00:00:00Z",
		},
		{
			ID:        "usr-owner-2",
			Name:      "พุฒิพงศ์ ราชรักษ์ (Owner)",
			Username:  "phuttiphong",
			Email:     "phuttiphong.ratcharak@example.com",
			Password:  "phuttiphong2026",
			Role:      "admin",
			CreatedAt: "2026-07-19T00:00:00Z",
		},
	}
)

// LoginHandler processes user login
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		JSONResponse(w, http.StatusMethodNotAllowed, models.AuthResponse{Success: false, Message: "Method not allowed"})
		return
	}

	var req models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		JSONResponse(w, http.StatusBadRequest, models.AuthResponse{Success: false, Message: "Invalid JSON request"})
		return
	}

	usersLock.Lock()
	defer usersLock.Unlock()

	cleanID := strings.TrimSpace(strings.ToLower(req.Identifier))
	for i := range userStore {
		if (strings.ToLower(userStore[i].Username) == cleanID || strings.ToLower(userStore[i].Email) == cleanID) &&
			userStore[i].Password == req.Password {
			userStore[i].LastLogin = time.Now().Format(time.RFC3339)
			JSONResponse(w, http.StatusOK, models.AuthResponse{
				Success: true,
				Message: "เข้าสู่ระบบสำเร็จ!",
				User:    &userStore[i],
				Token:   fmt.Sprintf("token-%d", time.Now().Unix()),
			})
			return
		}
	}

	JSONResponse(w, http.StatusUnauthorized, models.AuthResponse{
		Success: false,
		Message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
	})
}

// RegisterHandler registers a new user
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		JSONResponse(w, http.StatusMethodNotAllowed, models.AuthResponse{Success: false, Message: "Method not allowed"})
		return
	}

	var req models.RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		JSONResponse(w, http.StatusBadRequest, models.AuthResponse{Success: false, Message: "Invalid JSON request"})
		return
	}

	usersLock.Lock()
	defer usersLock.Unlock()

	cleanUsername := strings.TrimSpace(strings.ToLower(req.Username))
	cleanEmail := strings.TrimSpace(strings.ToLower(req.Email))

	for _, u := range userStore {
		if strings.ToLower(u.Username) == cleanUsername || strings.ToLower(u.Email) == cleanEmail {
			JSONResponse(w, http.StatusConflict, models.AuthResponse{
				Success: false,
				Message: "ชื่อผู้ใช้หรืออีเมลนี้มีอยู่ในระบบแล้ว",
			})
			return
		}
	}

	role := req.Role
	if role != "admin" {
		role = "member"
	}

	newUser := models.UserAccount{
		ID:        fmt.Sprintf("usr-%d", time.Now().UnixNano()),
		Name:      strings.TrimSpace(req.Name),
		Username:  strings.TrimSpace(req.Username),
		Email:     strings.TrimSpace(req.Email),
		Password:  req.Password,
		Role:      role,
		CreatedAt: time.Now().Format(time.RFC3339),
		LastLogin: time.Now().Format(time.RFC3339),
	}

	userStore = append(userStore, newUser)

	JSONResponse(w, http.StatusCreated, models.AuthResponse{
		Success: true,
		Message: "ลงทะเบียนบัญชีใหม่สำเร็จเรียบร้อย!",
		User:    &newUser,
	})
}

// UsersListHandler returns all registered users
func UsersListHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		JSONResponse(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
		return
	}

	usersLock.RLock()
	defer usersLock.RUnlock()

	JSONResponse(w, http.StatusOK, userStore)
}
