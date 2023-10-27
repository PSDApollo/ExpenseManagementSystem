CREATE TABLE profile (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE expense (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    expense DATE,
    description VARCHAR(255),
    profile_id INT
)
