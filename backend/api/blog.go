package api 

import (
	"encoding/json"
	"net/http"

	"backend/service"
	"database/sql"
)

func BlogHandler(database *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		blogs, err := service.GetBlogs(database)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		json.NewEncoder(w).Encode(blogs)
	}
}
