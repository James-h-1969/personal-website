package service

import (
	"database/sql"
	"backend/models"
	"fmt"
)

func GetBlogs(database *sql.DB, id int) ([]models.Blog, error) {
	queryString := "SELECT id, title, summary, cover_image, date_created FROM blogs"

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
	for rows.Next() {
		var blog models.Blog 
		err := rows.Scan(&blog.ID, &blog.Title, &blog.Summary, &blog.CoverImage, &blog.DateCreated)
		if err != nil {
			return nil, err
		}
		blogs = append(blogs, blog)
	}

	return blogs, nil
}
