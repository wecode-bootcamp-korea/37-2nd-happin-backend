-- migrate:up
CREATE TABLE boards(
  id int not null auto_increment primary key,
  name varchar(50) not null,
  user_id int not null,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE boards;