package main

import (
    "fmt"
    "log"
    "net/http"
    "backend/api"
    "backend/config"
)

func main() {
    // Connect DB
    db, err := config.InitDB()
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Routes
    http.HandleFunc("/api/blog/", api.BlogHandler(db))
    http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("./images"))))

    fmt.Println("Starting backend on :8080...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
