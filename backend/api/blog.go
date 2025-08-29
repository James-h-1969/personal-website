package api 

import (
	"encoding/json"
	"net/http"
	"strings"
	"backend/service"
	"strconv"
	"database/sql"
	"fmt"
)

func BlogHandler(database *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		pathParts := strings.Split(r.URL.Path, "/")

		// parse the id if in parameters
		id := -1
		if len(pathParts) == 4 && pathParts[3] != "" {
			givenId, err := strconv.Atoi(pathParts[3])
			if err != nil {
				fmt.Println("Error converting string to int: ", err)
				return 
			}
			id = givenId 
		}

		blogs, err := service.GetBlogs(database, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		json.NewEncoder(w).Encode(blogs)
	}
}
