-- migrate:up
CREATE TABLE stored_pins(
  id int not null auto_increment primary key,
  user_id int not null,
  pin_id int not null,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pin_id) REFERENCES pins(id)
);

-- migrate:down
DROP TABLE stored_pins;