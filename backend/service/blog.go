package service

import (
	"database/sql"
	"backend/models"
)

func GetBlogs(database *sql.DB) ([]models.Blog, error) {
	rows, err := database.Query("SELECT id, title, summary, cover_image, date_created FROM blogs")
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
