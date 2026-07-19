package store

import "about-us-server/models"

func initServicesData(s *MemoryStore) {
	s.Services = []models.ServiceItem{
		{
			ID:          "srv-1",
			Title:       "High-Performance Web Development",
			Description: "Building responsive, modern web applications powered by Angular, TypeScript, and rich micro-animations.",
			Icon:        "💻",
			Category:    "Frontend",
			Highlights:  []string{"Angular & TypeScript", "SEO & Core Web Vitals Optimization", "Custom Component Libraries"},
		},
		{
			ID:          "srv-2",
			Title:       "Golang Microservices & REST APIs",
			Description: "Developing ultra-fast, concurrent, and scalable backend REST & gRPC API services in Go.",
			Icon:        "⚙️",
			Category:    "Backend",
			Highlights:  []string{"Clean Architecture", "JWT & OAuth Security", "Sub-millisecond API response times"},
		},
		{
			ID:          "srv-3",
			Title:       "UI/UX & Design Systems",
			Description: "Creating dark-mode glassmorphic user interfaces, design tokens, and interactive UI prototypes.",
			Icon:        "✨",
			Category:    "Design",
			Highlights:  []string{"Glassmorphism & Neon Aesthetics", "Responsive Mobile-First Layouts", "Interactive Design Tokens"},
		},
		{
			ID:          "srv-4",
			Title:       "Cloud Architecture & DevOps",
			Description: "Automated CI/CD pipelines, containerization, Docker environments, and cloud infrastructure.",
			Icon:        "☁️",
			Category:    "DevOps",
			Highlights:  []string{"Docker & Kubernetes", "CI/CD Pipeline Setup", "24/7 Health Monitoring"},
		},
	}

	s.Timeline = []models.TimelineItem{
		{Year: "2020", Title: "Company Founded", Description: "Nexus Tech Innovations was born as a specialized Golang backend engineering studio.", Tag: "Foundation", Icon: "🚩"},
		{Year: "2021", Title: "Expanded to Frontend & Angular", Description: "Integrated modern Angular frontend capabilities to deliver end-to-end fullstack applications.", Tag: "Growth", Icon: "🌱"},
		{Year: "2023", Title: "100+ Successful Projects", Description: "Crossed milestone of 100 enterprise and startup product launches globally.", Tag: "Milestone", Icon: "🎯"},
		{Year: "2025", Title: "Next-Gen AI & API Integrations", Description: "Adopted cutting-edge AI SDKs and real-time streaming services across all client platforms.", Tag: "Innovation", Icon: "🤖"},
		{Year: "2026", Title: "Global Tech Hub Expansion", Description: "Expanding team and offering multi-cloud solutions worldwide.", Tag: "Future", Icon: "🌐"},
	}

	s.Testimonials = []models.TestimonialItem{
		{
			ID:        "t-1",
			Client:    "Jonathan Hayes",
			Company:   "FinTech Global Ltd.",
			Avatar:    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
			Quote:     "The Go backend built by Nexus delivered incredible latency improvements. Combined with their sleek Angular dashboard, our platform engagement increased by 300%!",
			Rating:    5,
			Project:   "Financial Analytics Dashboard",
		},
		{
			ID:        "t-2",
			Client:    "Sarah Jenkins",
			Company:   "Vanguard Creative Studio",
			Avatar:    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
			Quote:     "Working with this team was seamless. The website design exceeded our expectations in aesthetics and speed. Highly recommended!",
			Rating:    5,
			Project:   "Corporate Brand Portal",
		},
		{
			ID:        "t-3",
			Client:    "Michael Croft",
			Company:   "Nexus Health Tech",
			Avatar:    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
			Quote:     "Top-notch code quality and outstanding communication. Their team delivered our complex portal ahead of schedule.",
			Rating:    5,
			Project:   "Patient Care Portal",
		},
	}

	s.FAQs = []models.FAQItem{
		{
			ID:       "faq-1",
			Question: "Why do you use Golang for backend and Angular for frontend?",
			Answer:   "Golang offers unmatched performance, static typing, low memory footprint, and native concurrency for scalable APIs. Angular provides a robust, enterprise-grade framework with TypeScript, RxJS, and modular architecture perfect for complex web applications.",
			Category: "Tech Stack",
		},
		{
			ID:       "faq-2",
			Question: "Can I customize the team members and company profile data?",
			Answer:   "Yes! The Go backend serves structured JSON endpoints. You can easily update `store/data.go` or connect it to a database like PostgreSQL or MongoDB.",
			Category: "Customization",
		},
		{
			ID:       "faq-3",
			Question: "How does the contact form work?",
			Answer:   "The Angular contact form submits HTTP POST requests directly to `/api/v1/contact`. The Go backend validates inputs, generates a timestamped submission object, and stores it in memory.",
			Category: "Features",
		},
		{
			ID:       "faq-4",
			Question: "Is the frontend responsive on mobile devices?",
			Answer:   "Absoluty. The design system is engineered mobile-first with modern CSS flexbox/grid layout and fluid touch interactions.",
			Category: "Design",
		},
	}
}
