UPDATE users
    SET user_name = $2,
    user_email = $3,
    company_id = $4
WHERE id = $1;