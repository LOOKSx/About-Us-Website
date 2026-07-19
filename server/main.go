package main

import (
	"about-us-server/middleware"
	"about-us-server/routes"
	"about-us-server/store"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
)

func main() {
	// Initialize thread-safe data store
	store.InitStore()

	// Initialize API router
	mux := routes.SetupRoutes()

	// Wrap with CORS middleware
	handler := middleware.EnableCORS(mux)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	addr := fmt.Sprintf(":%s", port)
	localIP := getLocalIP()

	log.Printf("==========================================================")
	log.Printf("🚀 Golang REST API Server Running on all interfaces!")
	log.Printf("💻 Local Machine:    http://localhost%s/api/v1/", addr)
	if localIP != "" {
		log.Printf("📱 Mobile Network:   http://%s%s/api/v1/", localIP, addr)
		log.Printf("🌐 Mobile Angular:   http://%s:4200", localIP)
	}
	log.Printf("==========================================================")

	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

func getLocalIP() string {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return ""
	}
	for _, address := range addrs {
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}
	return ""
}
