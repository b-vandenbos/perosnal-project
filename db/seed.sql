CREATE TABLE company (
    id serial primary key,
    company_name varchar(255),
    company_logo text
);

CREATE TABLE users (
    id serial primary key,
    company_id integer references company(id),
    user_name varchar(255),
    user_email varchar(255),
    passwordset boolean,
    password text,
    user_image text,
    isadmin boolean,
    delete_id integer references company(id)
    );

CREATE TABLE dimension (
    id serial primary key,
    company_id integer references company(id),
    index integer,
    q_dimension varchar(100)
);

CREATE TABLE survey (
    id serial primary key,
    company_id integer references company(id),
    user_id integer,
    index integer,
    q_id varchar(10),
    q_dimension_id integer references dimension(id),
    q_text varchar(255),
    q_category varchar(100)
);

CREATE TABLE suggested (
    id serial primary key,
    company_id integer references company(id),
    user_id integer,
    q_id varchar(10),
    q_dimension_id integer references dimension(id),
    q_text varchar(255),
    q_category varchar(255)
);

CREATE TABLE discussion (
    id serial primary key,
    company_id integer references company(id),
    user_id integer,
    message text,
    message_date varchar(10),
    message_time varchar(10)
);