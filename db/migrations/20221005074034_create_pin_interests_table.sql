-- migrate:up
CREATE TABLE pin_interests(
  id int not null auto_increment primary key,
  pin_id int not null,
  interest_id int not null,
  FOREIGN KEY (pin_id) REFERENCES pins(id),
  FOREIGN KEY (interest_id) REFERENCES interests(id)
);

-- migrate:down
DROP TABLE pin_interests;
