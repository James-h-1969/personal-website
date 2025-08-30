package service 

import (
	"database/sql"
	"backend/models"
	"fmt"
)

func AddSubscriber(database *sql.DB, email string) error {
	// Use parameterized query (no SQL injection risk)
	query := "INSERT INTO subscriber (email) VALUES ($1)"
	_, err := database.Exec(query, email)
	return err
}
