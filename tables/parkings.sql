USE pfe;
CREATE TABLE parkings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    city VARCHAR(50),
    total_spots INT,
    available_spots INT
);
