USE pfe;
CREATE TABLE parking_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    parking_id VARCHAR(255) NOT NULL,
    tariff_type_id VARCHAR(255) NOT NULL,
    units INT NOT NULL,
    date DATETIME NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parking_id) REFERENCES parkings(id),
    FOREIGN KEY (tariff_type_id) REFERENCES tariff_types(id)
);
