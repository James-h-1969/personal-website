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

func SubscriberHandler(database *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		pathParts := strings.Split(r.URL.Path, "/")

	}
}
