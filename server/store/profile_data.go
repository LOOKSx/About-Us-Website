package store

import "about-us-server/models"

func initProfileData(s *MemoryStore) {
	s.Profile = models.Profile{
		Name:        "Nexus Tech Innovations",
		Tagline:     "Building the Future of Digital Experiences",
		HeroBio:     "We are a passionate team of engineers, designers, and innovators dedicated to building high-performance software, sleek web applications, and intelligent cloud systems.",
		FullStory:   "Founded in 2020, Nexus Tech Innovations started with a single vision: to bridge complex software architecture with intuitive, human-centered user experiences. Today, we empower startups and enterprises across the globe with state-of-the-art web technologies and scalable Go backend services.",
		Vision:      "To become the world's most trusted partner for high-reliability, beautiful, and cloud-native digital products.",
		Mission:     "Deliver exceptional code quality, ultra-fast performance, and captivating user experiences through cutting-edge technology stacks.",
		FoundedYear: 2020,
		Location:    "Bangkok, Thailand & Global Distributed",
		CoreValues: []models.ValueItem{
			{
				ID:          "val-1",
				Icon:        "⚡",
				Title:       "High Performance First",
				Description: "We craft hyper-optimized codebases in Go and modern web frameworks for lightning-fast speeds.",
			},
			{
				ID:          "val-2",
				Icon:        "🎨",
				Title:       "Human-Centric Design",
				Description: "Every interface is tailored with high aesthetic standards, micro-animations, and fluid UX.",
			},
			{
				ID:          "val-3",
				Icon:        "🛡️",
				Title:       "Uncompromised Quality",
				Description: "Strong typing, extensive testing, and clean modular software architecture built to last.",
			},
			{
				ID:          "val-4",
				Icon:        "🚀",
				Title:       "Continuous Innovation",
				Description: "Constantly researching and mastering next-generation AI, cloud, and reactive frontend solutions.",
			},
		},
	}

	s.Stats = []models.StatItem{
		{ID: "st-1", Label: "Projects Delivered", Value: "120+", Number: 120, Suffix: "+", Icon: "📁", Highlight: "Global Deployments"},
		{ID: "st-2", Label: "Happy Clients", Value: "98%", Number: 98, Suffix: "%", Icon: "⭐", Highlight: "5-Star Rating"},
		{ID: "st-3", Label: "Years of Excellence", Value: "6+", Number: 6, Suffix: "+", Icon: "🏆", Highlight: "Since 2020"},
		{ID: "st-4", Label: "Code Commits", Value: "45K+", Number: 45, Suffix: "K+", Icon: "💻", Highlight: "Active Engineering"},
	}

	s.Team = []models.TeamMember{
		{
			ID:          "tm-1",
			Name:        "Alexandre Vance",
			Role:        "Chief Executive Officer & Lead Architect",
			Department:  "Leadership",
			Bio:         "10+ years in distributed systems engineering and product management. Passionate about Go, high concurrency, and technical leadership.",
			AvatarURL:   "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
			Skills:      []string{"Golang", "System Design", "Cloud Native", "Strategy"},
			GitHubURL:   "https://github.com",
			LinkedInURL: "https://linkedin.com",
			TwitterURL:  "https://twitter.com",
			Featured:    true,
		},
		{
			ID:          "tm-2",
			Name:        "Sophia Chen",
			Role:        "Principal UI/UX Designer & Frontend Lead",
			Department:  "Design",
			Bio:         "Pioneer in dark mode glassmorphism and modern UI systems. Passionate about micro-interactions and accessibility.",
			AvatarURL:   "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
			Skills:      []string{"Angular", "Figma", "CSS/SASS", "Design Systems"},
			GitHubURL:   "https://github.com",
			LinkedInURL: "https://linkedin.com",
			TwitterURL:  "https://twitter.com",
			Featured:    true,
		},
		{
			ID:          "tm-3",
			Name:        "Marcus Sterling",
			Role:        "Senior Backend & Cloud Engineer",
			Department:  "Engineering",
			Bio:         "Go enthusiast, Microservices expert, and Kubernetes tinkerer. Loves building robust APIs with low latency.",
			AvatarURL:   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
			Skills:      []string{"Golang", "PostgreSQL", "Docker", "Kubernetes"},
			GitHubURL:   "https://github.com",
			LinkedInURL: "https://linkedin.com",
			TwitterURL:  "https://twitter.com",
			Featured:    true,
		},
		{
			ID:          "tm-4",
			Name:        "Elena Rostova",
			Role:        "Frontend Engineer & Angular Specialist",
			Department:  "Engineering",
			Bio:         "Expert in Angular state management, reactive streams, and high-performance Web APIs.",
			AvatarURL:   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
			Skills:      []string{"Angular", "TypeScript", "RxJS", "WebSockets"},
			GitHubURL:   "https://github.com",
			LinkedInURL: "https://linkedin.com",
			TwitterURL:  "https://twitter.com",
			Featured:    false,
		},
		{
			ID:          "tm-5",
			Name:        "David Park",
			Role:        "Product & Operations Manager",
			Department:  "Product",
			Bio:         "Connecting technical engineering with client goals. Ensuring agile delivery and flawless product execution.",
			AvatarURL:   "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
			Skills:      []string{"Agile/Scrum", "Product Roadmap", "Analytics", "Client Success"},
			GitHubURL:   "https://github.com",
			LinkedInURL: "https://linkedin.com",
			TwitterURL:  "https://twitter.com",
			Featured:    false,
		},
	}
}
