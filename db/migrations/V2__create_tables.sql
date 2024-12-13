-- Definitions

CREATE TABLE grades (
  grade VARCHAR(255) PRIMARY KEY
);

INSERT INTO grades (grade) 
VALUES 
  ('3'), ('4'), ('4+'), ('5'), ('5+'), 
  ('6A'), ('6A+'), ('6B'), ('6B+'), ('6C'), 
  ('6C+'), ('7A'), ('7A+'), ('7B'), ('7B+'), 
  ('7C'), ('7C+'), ('8A'), ('8A+'), ('8B'), 
  ('8B+'), ('8C'), ('8C+'), ('9A'), ('9A+');

CREATE TABLE status (
  status VARCHAR(255) PRIMARY KEY
);

INSERT INTO status (status) 
VALUES 
  ('Besteget'), ('Prosjekt'), ('Inaktiv'), ('Slettet');

CREATE TABLE start (
  start VARCHAR(255) PRIMARY KEY
);

INSERT INTO start (start) 
VALUES 
  ('Ståstart'), ('Sittstart'), ('Hoppstart');

-- Tables

CREATE TABLE crags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  latitude FLOAT8,
  longitude FLOAT8
);

CREATE TABLE boulder_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  crag_id UUID REFERENCES crags(id),
  latitude FLOAT8,
  longitude FLOAT8
);

CREATE TABLE boulders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  grade VARCHAR(255) REFERENCES grades(grade),
  start VARCHAR(255) REFERENCES start(start) DEFAULT 'Ståstart',
  description TEXT,
  latitude FLOAT8,
  longitude FLOAT8,
  image_base_url VARCHAR(255),
  image_line_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP,
  status VARCHAR(255) REFERENCES status(status) DEFAULT 'Prosjekt',
  first_ascender VARCHAR(255),
  first_ascent DATE,
  boulder_group_id UUID REFERENCES boulder_groups(id)
);
