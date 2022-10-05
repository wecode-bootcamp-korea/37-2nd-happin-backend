-- migrate:up
CREATE TABLE users(
    id int not null auto_increment primary key,
    social_id bigint not null,
    social_type_id int not null,
    email varchar(100) not null unique key,
    username varchar(50) not null,
    gender int null,
    age int null,
    profile_image varchar(400) null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp null default current_timestamp,
    FOREIGN KEY (social_type_id) REFERENCES social_types(id)
);

-- migrate:down
DROP TABLE users;
