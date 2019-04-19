SELECT users.id, company_name, company_id, user_name, user_email FROM users
JOIN company on company.id = users.company_id
WHERE users.isadmin = 'true'
ORDER BY user_name asc;