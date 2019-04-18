UPDATE users 
SET company_id = $2
WHERE users.id = $1;

SELECT * FROM users WHERE users.id = $1;