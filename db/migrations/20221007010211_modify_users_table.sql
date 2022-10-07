-- migrate:up
    ALTER TABLE users DROP COLUMN email;
    ALTER TABLE users ADD email varchar(100) NULL;
-- migrate:down
DROP TABLE users;