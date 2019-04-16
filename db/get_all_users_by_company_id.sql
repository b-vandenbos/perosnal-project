SELECT company_name, user_name, user_email FROM users
JOIN company on company.id = users.company_id
WHERE users.company_id = $1
ORDER BY user_name asc;