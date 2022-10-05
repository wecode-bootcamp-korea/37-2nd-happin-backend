-- migrate:up
CREATE TABLE user_interests(
  id int not null auto_increment primary key,
  user_id int not null,
  interest_id int not null,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (interest_id) REFERENCES interests(id)
);

-- migrate:down
DROP TABLE user_interests;