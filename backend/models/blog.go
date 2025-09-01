package models

// Define your blog structure
type Blog struct {
    ID      int    `json:"id"`
    Title   string `json:"title"`
    Summary string `json:"summary"`
		CoverImage string `json:"cover_image"`
		DateCreated string `json:"date_created"`
		Content string `json:"content"`
}


