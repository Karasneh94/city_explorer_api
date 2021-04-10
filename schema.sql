DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS weather;
DROP TABLE IF EXISTS park;

CREATE TABLE weather (
    id SERIAL PRIMARY KEY,
  forecast VARCHAR(255),
  time VARCHAR(255) NOT NULL
);

CREATE TABLE park (
    id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  fee VARCHAR(255),
  description VARCHAR(500),
  url VARCHAR(500)
);

CREATE TABLE location (
    id SERIAL PRIMARY KEY,
  search_query VARCHAR(255) NOT NULL,
  formatted_query VARCHAR(255),
  latitude Decimal(8,6) NOT NULL,
  longitude Decimal(9,6) NOT NULL
);
