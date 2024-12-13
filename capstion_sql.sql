CREATE TABLE users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	pass_word VARCHAR(255),
	full_name VARCHAR(255) NOT NULL,
	age INT,
	avatar VARCHAR(255),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE images (
	image_id INT AUTO_INCREMENT PRIMARY KEY,
	image_name VARCHAR(255),
	link VARCHAR(255),
	description VARCHAR(255),
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)


CREATE TABLE save_image (
	user_id INT,
	image_id INT,
	save_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id, image_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (image_id) REFERENCES images(image_id),
	
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE comments (
	comment_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT,
	image_id INT,
	comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	comment_content VARCHAR(255),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (image_id) REFERENCES images(image_id),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)


-- Thêm dữ liệu vào bảng users
INSERT INTO users (email, pass_word, full_name, age, avatar) VALUES
('user1@example.com', 'password1', 'User One', 25, 'avatar1.jpg'),
('user2@example.com', 'password2', 'User Two', 30, 'avatar2.jpg'),
('user3@example.com', 'password3', 'User Three', 28, 'avatar3.jpg');

-- Thêm dữ liệu vào bảng images
INSERT INTO images (image_name, link, description, user_id) VALUES
('Sunset', 'link_to_sunset.jpg', 'Beautiful sunset view', 1),
('Mountains', 'link_to_mountains.jpg', 'Snowy mountains', 2),
('Ocean', 'link_to_ocean.jpg', 'Blue ocean with waves', 3);

-- Thêm dữ liệu vào bảng save_image
INSERT INTO save_image (user_id, image_id, save_date) VALUES
(1, 2, '2024-12-01 10:00:00'),
(2, 3, '2024-12-02 15:30:00'),
(3, 1, '2024-12-03 12:45:00');

-- Thêm dữ liệu vào bảng comments
INSERT INTO comments (user_id, image_id, comment_date, comment_content) VALUES
(1, 1, '2024-12-01 11:00:00', 'Amazing picture!'),
(2, 2, '2024-12-02 16:00:00', 'Looks fantastic!'),
(3, 3, '2024-12-03 13:00:00', 'I love this view.');

SELECT created_at,
DATE_ADD(created_at,INTERVAL 7 HOUR) AS adjusted_create_at
FROM users

UPDATE users
set created_at = DATE_ADD(created_at,INTERVAL 7 HOUR)

CREATE TRIGGER before_insert_users
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    SET NEW.created_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
END;
DELIMITER;

CREATE TRIGGER before_update_users
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    SET NEW.updated_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
END;


-- Bảng images
UPDATE images
SET created_at = DATE_ADD(created_at, INTERVAL 7 HOUR),
    updated_at = DATE_ADD(updated_at, INTERVAL 7 HOUR);

CREATE TRIGGER before_insert_images
BEFORE INSERT ON images
FOR EACH ROW
BEGIN
    SET NEW.created_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
    SET NEW.updated_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
END;


CREATE TRIGGER before_update_images
BEFORE UPDATE ON images
FOR EACH ROW
BEGIN
    SET NEW.updated_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
END;

-- Bảng save_image
UPDATE save_image
SET created_at = DATE_ADD(created_at, INTERVAL 7 HOUR),
    updated_at = DATE_ADD(updated_at, INTERVAL 7 HOUR);

CREATE TRIGGER before_insert_save_image
BEFORE INSERT ON save_image
FOR EACH ROW
BEGIN
    SET NEW.created_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
    SET NEW.updated_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
END;

CREATE TRIGGER before_update_save_image
BEFORE UPDATE ON save_image
FOR EACH ROW
BEGIN
    SET NEW.updated_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
END;

-- Bảng comments
UPDATE comments
SET created_at = DATE_ADD(created_at, INTERVAL 7 HOUR),
    updated_at = DATE_ADD(updated_at, INTERVAL 7 HOUR);

CREATE TRIGGER before_insert_comments
BEFORE INSERT ON comments
FOR EACH ROW
BEGIN
    SET NEW.created_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
    SET NEW.updated_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
END;

CREATE TRIGGER before_update_comments
BEFORE UPDATE ON comments
FOR EACH ROW
BEGIN
    SET NEW.updated_at = DATE_ADD(NOW(), INTERVAL 7 HOUR);
END;





