package models

// ServiceItem represents services or core capabilities
type ServiceItem struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Icon        string   `json:"icon"`
	Highlights  []string `json:"highlights"`
	Category    string   `json:"category"`
}

// TimelineItem represents milestone history
type TimelineItem struct {
	Year        string `json:"year"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Tag         string `json:"tag"`
	Icon        string `json:"icon"`
}

// TestimonialItem represents client feedback
type TestimonialItem struct {
	ID        string `json:"id"`
	Client    string `json:"client"`
	Company   string `json:"company"`
	Avatar    string `json:"avatar"`
	Quote     string `json:"quote"`
	Rating    int    `json:"rating"`
	Project   string `json:"project"`
}

// FAQItem represents frequently asked questions
type FAQItem struct {
	ID       string `json:"id"`
	Question string `json:"question"`
	Answer   string `json:"answer"`
	Category string `json:"category"`
}
