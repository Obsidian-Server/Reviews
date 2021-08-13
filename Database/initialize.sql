--Database and Tables Schema && ETL Process
CREATE DATABASE reviews_master;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(1000) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(100) NOT NULL,
  reviewer_email VARCHAR(100) NOT NULL,
  response VARCHAR(500) NOT NULL,
  helpfulness INTEGER NOT NULL
);

COPY reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/Users/sethbaker/Desktop/reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE reviews_photos (
  id SERIAL NOT NULL,
  review_id INTEGER NOT NULL,
  url VARCHAR(2000) NOT NULL
);

COPY reviews_photos (id, review_id, url)
FROM '/Users/sethbaker/Desktop/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE characteristics_reviews (
  id SERIAL NOT NULL,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL
);

COPY characteristics_reviews (id, characteristic_id, review_id, value)
FROM '/Users/sethbaker/Desktop/characteristics_reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE characteristics (
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL
);

COPY characteristics (id, product_id, name)
FROM '/Users/sethbaker/Desktop/characteristics.csv'
DELIMITER ','
CSV HEADER;