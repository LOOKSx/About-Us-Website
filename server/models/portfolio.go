package models

// SkillItem represents tech skills
type SkillItem struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Category    string `json:"category"`
	Proficiency int    `json:"proficiency"`
	Icon        string `json:"icon"`
	Description string `json:"description"`
}

// ProjectItem represents portfolio projects
type ProjectItem struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Category    string   `json:"category"`
	Description string   `json:"description"`
	ImageURL    string   `json:"image_url"`
	Tags        []string `json:"tags"`
	GitHubURL   string   `json:"github_url"`
	DemoURL     string   `json:"demo_url"`
	Date        string   `json:"date"`
	Featured    bool     `json:"featured"`
}
