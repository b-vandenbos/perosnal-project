CREATE TABLE company (
    id serial primary key,
    company_name varchar(255),
    company_logo text
);

CREATE TABLE users (
    id serial primary key,
    company_id integer,
    user_name varchar(255),
    user_email varchar(255),
    passwordSet boolean,
    password text,
    user_image text,
    isAdmin boolean
    );

