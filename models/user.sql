-- User Table
CREATE Table users (
    id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    google_id varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255),
    role varchar(255) NOT NULL DEFAULT 'user',
    PRIMARY KEY (id),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Shortlets Table
CREATE Table shortlets (
    id int(11) NOT NULL AUTO_INCREMENT,
    aptName varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
    numRooms int(11) NOT NULL,
    address varchar(255) NOT NULL,
    price int(11) NOT NULL,
    img1 varchar(255) DEFAULT NULL,
    img2 varchar(255) DEFAULT NULL,
    status ENUM ('available', 'booked') NOT NULL DEFAULT 'available',
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Booking Table
CREATE Table bookings (
    id int(11) NOT NULL AUTO_INCREMENT,
    shortlet_id int(11) NOT NULL,
    user_id int(11) NOT NULL,
    num_of_nights int(11) NOT NULL,
    amount int(11) NOT NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    payment_ref VARCHAR(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (shortlet_id) REFERENCES shortlets(id),
    FOREIGN KEY (user_id) REFERENCES users(id)

);