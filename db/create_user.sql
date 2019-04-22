INSERT INTO users (
    company_id,
    delete_id,
    user_name,
    user_email,
    passwordSet,
    password,
    isAdmin
) VALUES (
    $1,
    $1,
    $2,
    $3,
    'false',
    $4,
    $5
);

SELECT company_name, user_name, user_email FROM users
JOIN company on company.id = users.company_id
ORDER BY user_name asc;