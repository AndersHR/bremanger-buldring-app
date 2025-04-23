ALTER TABLE boulder_groups ADD COLUMN image_url VARCHAR(255);
ALTER TABLE boulder_groups ADD COLUMN created_at TIMESTAMP DEFAULT now();
ALTER TABLE boulder_groups ADD COLUMN updated_at TIMESTAMP DEFAULT now();
ALTER TABLE boulder_groups ADD COLUMN deleted_at TIMESTAMP;

CREATE TRIGGER update_last_updated_trigger
BEFORE UPDATE ON boulder_groups
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
