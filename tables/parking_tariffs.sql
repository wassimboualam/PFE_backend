USE pfe;
CREATE TABLE parking_tariffs (
    parking_id INT,
    tariff_type_id INT,
    hourly_price DECIMAL(10,2),
    daily_price DECIMAL(10,2),
    PRIMARY KEY (parking_id, tariff_type_id),
    FOREIGN KEY (parking_id) REFERENCES parking(id),
    FOREIGN KEY (tariff_type_id) REFERENCES tariff_type(id)
);
