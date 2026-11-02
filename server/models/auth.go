package models

type UserAccount struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Role      string `json:"role"` // "admin" or "member"
	CreatedAt string `json:"created_at"`
	LastLogin string `json:"last_login,omitempty"`
}

type LoginRequest struct {
	Identifier string `json:"identifier"`
	Password   string `json:"password"`
}

type RegisterRequest struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type AuthResponse struct {
	Success bool         `json:"success"`
	Message string       `json:"message"`
	User    *UserAccount `json:"user,omitempty"`
	Token   string       `json:"token,omitempty"`
}
