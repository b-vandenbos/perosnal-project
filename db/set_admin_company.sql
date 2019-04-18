UPDATE users 
SET company_id = $2
WHERE id = $1;

SELECT users.id, users.company_id, user_name, user_email, passwordset, user_image, isadmin, company_name FROM users
JOIN company ON company.id = users.company_id
WHERE users.id = $1;