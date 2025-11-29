package service

import (
	"encoding/json"
	"database/sql"
	"backend/models"
	"fmt"
)

func GetBlogs(database *sql.DB, id int) ([]models.Blog, error) {
	queryString := "SELECT * FROM blogs"

	if id >= 0 {
		queryString += fmt.Sprintf(" WHERE id = %d", id)
	}

	queryString += " ORDER by date_created DESC"

	rows, err := database.Query(queryString)
	if err != nil {
		return nil, err 
	}
	defer rows.Close()

	var blogs []models.Blog 
	var tagsJSON string
	for rows.Next() {
		var blog models.Blog 
		err := rows.Scan(&blog.ID, &blog.Title, &blog.Summary, &blog.CoverImage, &blog.DateCreated, &blog.Content, &tagsJSON)
		if err != nil {
			return nil, err
		}
		err = json.Unmarshal([]byte(tagsJSON), &blog.Tags)
		if err != nil {
			return nil, err
		}

		blogs = append(blogs, blog)
	}

	return blogs, nil
}
