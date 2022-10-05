-- migrate:up
CREATE TABLE social_types(
  id int not null auto_increment primary key,
  name varchar(100) not null unique key
);

-- migrate:down
DROP TABLE social_types
