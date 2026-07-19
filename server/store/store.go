package store

import (
	"about-us-server/models"
	"fmt"
	"sync"
	"time"
)

type MemoryStore struct {
	mu           sync.RWMutex
	Profile      models.Profile
	Stats        []models.StatItem
	Team         []models.TeamMember
	Services     []models.ServiceItem
	Timeline     []models.TimelineItem
	Testimonials []models.TestimonialItem
	FAQs         []models.FAQItem
	Contacts     []models.ContactSubmission
	StartTime    time.Time
}

var Instance *MemoryStore

func InitStore() *MemoryStore {
	Instance = &MemoryStore{
		StartTime: time.Now(),
		Contacts:  []models.ContactSubmission{},
	}
	initProfileData(Instance)
	initServicesData(Instance)
	return Instance
}

func (s *MemoryStore) AddContact(name, email, subject, message string) models.ContactSubmission {
	s.mu.Lock()
	defer s.mu.Unlock()

	sub := models.ContactSubmission{
		ID:        fmt.Sprintf("msg-%d", time.Now().UnixNano()),
		Name:      name,
		Email:     email,
		Subject:   subject,
		Message:   message,
		CreatedAt: time.Now(),
	}
	s.Contacts = append(s.Contacts, sub)
	return sub
}
