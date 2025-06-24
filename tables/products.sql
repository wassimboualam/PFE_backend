USE pfe;
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(30) NOT NULL,
    size VARCHAR(5) NOT NULL,
    rating INT,
    demographic VARCHAR(30) NOT NULL,
    price INT NOT NULL
);

