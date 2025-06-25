USE pfe;
CREATE TABLE parkings (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    total_spots INT NOT NULL,
    available_spots INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    price_per_hour DECIMAL(10, 2),
    price_per_day DECIMAL(10, 2)
);
