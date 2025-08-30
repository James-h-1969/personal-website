package api 

import (
	"encoding/json"
	"net/http"
	"backend/service"
	"database/sql"
	"backend/models"
)

func SubscriberHandler(database *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		
		switch r.Method {
		case http.MethodPost:
			var sub models.Subscriber 

			if err := json.NewDecoder(r.Body).Decode(&sub); err != nil {
				http.Error(w, "invalid request body", http.StatusBadRequest)
				return 
			}

			service.AddSubscriber(database, sub.Email)

			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(map[string]string{
				"message":"subscriber added",
				"email": sub.Email,
			})
		}
	}
}
