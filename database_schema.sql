-- TravelNest Database Schema
-- Run this script in MySQL to create the tables manually

-- Users table
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN', 'GUIDE') NOT NULL
);

-- Homestays table
CREATE TABLE homestay (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    price_per_night DECIMAL(10,2),
    max_guests INT,
    amenities TEXT,
    image_url VARCHAR(500)
);

-- Guides table
CREATE TABLE guide (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    experience_years INT,
    languages VARCHAR(255),
    specialties VARCHAR(255),
    description TEXT,
    contact_info VARCHAR(255),
    rating DECIMAL(3,2),
    image_url VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Bookings table
CREATE TABLE booking (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    homestay_id BIGINT,
    guide_id BIGINT,
    item_type VARCHAR(50),
    check_in VARCHAR(50),
    check_out VARCHAR(50),
    nights INT,
    total_price DECIMAL(10,2),
    payment_method VARCHAR(255),
    payment_summary TEXT,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'),
    created_at VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (homestay_id) REFERENCES homestay(id),
    FOREIGN KEY (guide_id) REFERENCES guide(id)
);

-- Insert sample data (optional)
INSERT INTO user (username, email, password, role) VALUES
('admin', 'admin@travelnest.com', '$2a$10$example.hash.for.admin', 'ADMIN'),
('guide1', 'guide1@travelnest.com', '$2a$10$example.hash.for.guide', 'GUIDE'),
('user1', 'user1@travelnest.com', '$2a$10$example.hash.for.user', 'USER');

INSERT INTO homestay (name, description, location, price_per_night, max_guests, amenities) VALUES
('Mountain View Homestay', 'Beautiful homestay with mountain views', 'Himalayas', 150.00, 4, 'WiFi, Kitchen, Parking'),
('Beachside Retreat', 'Relaxing beach homestay', 'Goa', 200.00, 6, 'WiFi, Pool, Beach Access');

INSERT INTO guide (user_id, name, bio, experience_years, languages, specialties) VALUES
(2, 'John Doe', 'Experienced local guide', 5, 'English, Hindi', 'Hiking, Culture');