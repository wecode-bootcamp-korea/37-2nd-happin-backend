-- migrate:up
CREATE TABLE followers(
  id int not null auto_increment primary key,
  followers int not null,
  following int not null,
  FOREIGN KEY (followers) REFERENCES users(id),
  FOREIGN KEY (following) REFERENCES users(id)
);

-- migrate:down
DROP TABLE followers;