CREATE TABLE Users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name varchar(50),
  last_name varchar(50),
  email varchar(50)
);

CREATE TABLE Vehicles (
  id SERIAL PRIMARY KEY NOT NULL,
  make varchar(20),
  model varchar(20),
  year integer,
  owner_id integer REFERENCES Users(id)
);
