-- migrate:up
ALTER TABLE users MODIFY gender varchar(20) NULL;
-- migrate:down
DROP TABLE users;