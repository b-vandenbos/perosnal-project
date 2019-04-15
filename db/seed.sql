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

CREATE TABLE survey (
    id serial primary key,
    company_id integer,
    user_id integer,
    q_id varchar(10),
    q_dimension_id integer,
    q_text varchar(255),
    q_category varchar(100)
);

    insert into survey (
        company_id,
        q_id,
        q_dimension_id,
        q_text,
        q_category
    ) VALUES (
        '1',
        'S35',
        '1',
        'I have the tools and resources I need to do my job well.',
        null
);

CREATE TABLE dimension (
    id serial primary key,
    company_id integer,
    q_dimension varchar(100)
);

        insert into dimension (
            company_id,
            q_dimension
            ) values (
                1,
                'My Job'
            ), (
                1,
                'My Team'
            ), (
                1,
                'My Supervisor'
            ), (
                1,
                'My Organization'
            );

