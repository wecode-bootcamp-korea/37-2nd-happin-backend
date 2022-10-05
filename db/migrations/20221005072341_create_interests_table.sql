-- migrate:up
CREATE TABLE interests(
  id int not null auto_increment primary key,
  interest varchar(100) not null
);

-- migrate:down
DROP TABLE interests;