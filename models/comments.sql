-- to use id from cats and users
CREATE TABLE
    comments (
        id SERIAL PRIMARY KEY,
        comment VARCHAR(255) NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users (id),
        cat_id INTEGER NOT NULL REFERENCES cats (id),
        username VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
    );