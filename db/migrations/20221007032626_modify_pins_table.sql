-- migrate:up
    ALTER TABLE pins ADD UNIQUE (id, user_id);
-- migrate:down
DROP TABLE pins;
