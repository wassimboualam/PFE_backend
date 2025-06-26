USE pfe;
CREATE TABLE parking_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATETIME,
    user_id INT,
    parking_id INT,
    tariff_type_id INT,
    units INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (parking_id) REFERENCES parking(id),
    FOREIGN KEY (tariff_type_id) REFERENCES tariff_type(id)
);
