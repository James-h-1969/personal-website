
package config

import (
    "database/sql"
    _ "github.com/mattn/go-sqlite3"
)

func InitDB() (*sql.DB, error) {
    return sql.Open("sqlite3", "mydatabase.db")
}
