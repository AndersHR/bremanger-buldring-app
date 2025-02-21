-- Ubestemt grade
INSERT INTO grades (grade) VALUES ('Ubestemt');

-- Fjern nullable fra grade i boulder_routes
UPDATE boulders SET grade = 'Ubestemt' WHERE grade IS NULL;
ALTER TABLE boulders ALTER COLUMN grade SET DEFAULT 'Ubestemt';
ALTER TABLE boulders ALTER COLUMN grade SET NOT NULL;