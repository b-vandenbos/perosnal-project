INSERT INTO users (
    company_id,
    user_name,
    user_email,
    passwordSet,
    password,
    isAdmin
) VALUES (
    $1,
    $2,
    $3,
    'false',
    $4,
    $5
);