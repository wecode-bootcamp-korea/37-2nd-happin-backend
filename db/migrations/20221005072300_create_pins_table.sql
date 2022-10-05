-- migrate:up
CREATE TABLE pins(
    id int not null auto_increment primary key,
    title varchar(100) not null,
    content varchar(1000) not null,
    user_id int not null,
    pin_image varchar(400) null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp null default current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE pins;