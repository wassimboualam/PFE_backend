USE pfe;
CREATE TABLE carts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    creation_date TIMESTAMP DEFAULT current_timestamp(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_storage (
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)

);
