-- migrate:up
ALTER TABLE user_interests ADD UNIQUE(user_id, interest_id);

-- migrate:down
DROP TABLE user_interests