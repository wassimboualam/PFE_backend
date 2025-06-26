USE pfe;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    address VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(50) DEFAULT "user"
);

