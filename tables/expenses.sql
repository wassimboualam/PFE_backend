USE pfe;
CREATE TABLE expenses (
    id VARCHAR(255) PRIMARY KEY,
    parking_id VARCHAR(255) NOT NULL,
    parking_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    units INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL,

    FOREIGN KEY (parking_id) REFERENCES parkings(id)
);
