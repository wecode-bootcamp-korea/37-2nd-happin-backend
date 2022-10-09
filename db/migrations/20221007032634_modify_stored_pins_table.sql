-- migrate:up
ALTER TABLE stored_pins ADD UNIQUE(user_id, pin_id);

-- migrate:down
DROP TABLE stored_pins