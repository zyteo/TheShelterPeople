-- CREATE TABLE cats (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     name VARCHAR(255) NOT NULL,
--     description VARCHAR(255) NOT NULL,
--     image VARCHAR(255) NOT NULL,
--     gender VARCHAR(255) NOT NULL,
--     cage INTEGER NOT NULL,
--     adoptable BOOLEAN NOT NULL,
--     created_at DATETIME NOT NULL,
--     updated_at DATETIME NOT NULL
-- )

CREATE TABLE cats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    cage INTEGER NOT NULL,
    adoptable BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);