package models

// ValueItem represents a core company/personal value
type ValueItem struct {
	ID          string `json:"id"`
	Icon        string `json:"icon"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

// Profile represents main profile information
type Profile struct {
	Name        string      `json:"name"`
	Tagline     string      `json:"tagline"`
	HeroBio     string      `json:"hero_bio"`
	FullStory   string      `json:"full_story"`
	Vision      string      `json:"vision"`
	Mission     string      `json:"mission"`
	FoundedYear int         `json:"founded_year"`
	Location    string      `json:"location"`
	CoreValues  []ValueItem `json:"core_values"`
}

// StatItem represents key achievements and metrics
type StatItem struct {
	ID        string `json:"id"`
	Label     string `json:"label"`
	Value     string `json:"value"`
	Number    int    `json:"number"`
	Suffix    string `json:"suffix"`
	Icon      string `json:"icon"`
	Highlight string `json:"highlight"`
}
