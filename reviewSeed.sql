-- Drop tables if they exist
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS movies;

-- Create tables
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(50),
    releaseYear INT,
    description TEXT,
    rating DECIMAL(3, 1),
    image VARCHAR(255),
    director VARCHAR(100),
    duration INT
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewerName VARCHAR(100),
    reviewText TEXT,
    rating INT,
    movieId INT,
    reviewDate DATE,
    FOREIGN KEY (movieId) REFERENCES movies(id)
);

-- Insert data into movies table
INSERT INTO movies (id, title, genre, releaseYear, description, rating, image, director, duration) VALUES
(1, 'Inception', 'Science Fiction', 2010, 'A skilled thief is given a chance at redemption if he can successfully perform inception – planting an idea into someones mind.', 8.8, 'inception.jpg', 'Christopher Nolan', 148),
(2, 'The Shawshank Redemption', 'Drama', 1994, 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 9.3, 'shawshank_redemption.jpg', 'Frank Darabont', 142),
(3, 'The Dark Knight', 'Action', 2008, 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.', 9.0, 'dark_knight.jpg', 'Christopher Nolan', 152),
(4, 'Forrest Gump', 'Drama', 1994, 'The presidencies of Kennedy and Johnson, the events of Vietnam, the Watergate scandal, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.', 8.8, 'forrest_gump.jpg', 'Robert Zemeckis', 142),
(5, 'The Godfather', 'Crime', 1972, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 9.2, 'godfather.jpg', 'Francis Ford Coppola', 175);

-- Insert data into reviews table
INSERT INTO reviews (id, reviewerName, reviewText, rating, movieId, reviewDate) VALUES
(1, 'Juan Jose Pinol', 'A mind-bending rollercoaster of epic proportions! It’s like riding a unicorn through a kaleidoscope – pure cinematic magic.', 5, 1, '2024-07-29'),
(2, 'Tyler Byrd', 'Not bad, but the plot felt like a rerun of my grandma old soap operas. You could predict the twist while making a sandwich.', 3, 2, '2024-07-28'),
(3, 'Joanna McPherson', 'A high-octane thrill ride that’s like eating a bag of spicy popcorn while riding a rocket ship. Performances that’ll make you scream ‘Whoa!’', 4, 3, '2024-07-27'),
(4, 'Shaan Malhotra', 'An emotional journey that’s like hugging a giant, cuddly teddy bear while riding through a waterfall of feels. It’ll leave your heart in a puddle!', 4, 4, '2024-07-26');
