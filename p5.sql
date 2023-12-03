CREATE TABLE cafes (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
location VARCHAR(255) NOT NULL,
wifi BOOLEAN DEFAULT false,
music BOOLEAN DEFAULT false,
price_range VARCHAR(50),
atmosphere VARCHAR(255),
additional_features TEXT
);

CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
preferences TEXT
);

CREATE TABLE favorites (
user_id INT REFERENCES users(id),
cafe_id INT REFERENCES cafes(id),
added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (user_id, cafe_id)
);

SELECT *
FROM favorites;