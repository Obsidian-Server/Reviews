--Databse and Tables Schema
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
  helpfulness INTEGER NOT NULL,
);

CREATE TABLE reviews_photos (
  id SERIAL NOT NULL,
  review_id INTEGER NOT NULL,
  url VARCHAR(2000) NOT NULL
);

CREATE TABLE characteristics_reviews (
  id SERIAL NOT NULL,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL
);

CREATE TABLE characteristics (
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL
);


--ETL Process
