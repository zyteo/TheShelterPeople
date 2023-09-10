CREATE TABLE
    cats (
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