SELECT users.id, users.company_id, user_name, user_email, passwordset, password, user_image, isadmin, company_name FROM users
JOIN company ON company.id = users.company_id
WHERE users.user_email = $1;