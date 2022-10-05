-- migrate:up
CREATE TABLE custom_boards(
  id int not null auto_increment primary key,
  board_id int not null,
  pin_id int not null,
  FOREIGN KEY (board_id) REFERENCES boards(id),
  FOREIGN KEY (pin_id) REFERENCES pins(id),
  UNIQUE (board_id,pin_id)
);

-- migrate:down
DROP TABLE custom_boards;