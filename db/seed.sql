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



Select * from survey;

INSERT INTO survey (
    q_id,
    q_dimension_id,
    q_text,
    q_category
) VALUES (
    'S35',
    '1',
    'I have the tools and resources I need to do my job well.',
    NULL
), (
    'S33',
    '1',
    'I have received the training I need to do my job well.',
    NULL
), (
    'S97',
    '1',
    'The amount of work I am expected to do is reasonable.',
    NULL
), (
    'S34',
    '1',
    'I have the freedom to choose how to best perform my job.',
    'Autonomy'
), (
    'S47',
    '1',
    'It is easy to become absorbed in my job.',
    'Engagement Anchor'
), (
    'S59',
    '3',
    'My supervisor communicates important information to the team.',
    NULL
), (
    'S62',
    '3',
    'My supervisor gives me ongoing feedback about my performance.',
    NULL
), (
    'S142',
    '3',
    'My supervisor helps me align my own goals with the work that I do.',
    'Meaning'
), (
    'S103',
    '2',
    'The people I work with treat me with respect.',
    NULL
), (
    'S144',
    '2',
    'As a team, we help each other improve.',
    'Growth'
), (
    'S146',
    '2',
    'Our team is proud of the work we do.',
    'Meaning'
), (
    'S129',
    '4',
    'We work effectively across departments and functions.',
    NULL
), (
    'S25',
    '4',
    'I feel like I belong here.',
    'Connection'
), (
    'S43',
    '4',
    'I would choose to remain with this organization, even if a job with similar pay and benefits were available elsewhere.',
    null
), (
    'S44',
    '4',
    'I would recommend this organization as a great place to work.',
    'Engagement Anchor'
), (
    'S118',
    '4',
    'This organization is responsive to ideas and suggestions for improvement.',
    null
), (
    'DW1',
    '2',
    'Our team openly shares innovative and creative ideas with each other.',
    null
);


CREATE TABLE discussion (
    id serial primary key,
    company_id integer,
    user_id integer,
    message text,
    message_date varchar(10),
    message_time varchar(10)
);

INSERT INTO discussion (
    company_id,
    user_id,
    message,
    message_date,
    message_time
) VALUES (
    '1',
    '23',
    'I would like to add some questions about workplace safety.',
    'Apr 16',
    '11:53AM'
), (
    '1',
    '44',
    'Ok, I will take a look and see what I can find.',
    'Apr 16',
    '12:35PM'
);
