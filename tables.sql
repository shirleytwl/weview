CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32),
    password TEXT
);

CREATE TABLE Channels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32),
    youtube_id VARCHAR(32),
    thumbnail_url TEXT,
    link TEXT
);

CREATE TABLE Reviews (
    id SERIAL PRIMARY KEY,
    content TEXT,
    date_created TIMESTAMP DEFAULT now(),
    date_edited TIMESTAMP DEFAULT now(),
    user_id INT REFERENCES Users(id),
    channel_id INT REFERENCES Channels(id)
);

CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE Channel_Categories (
    id SERIAL PRIMARY KEY,
    channel_id INT REFERENCES Channels(id),
    category_id INT REFERENCES Categories(id)
);