UPDATE users
    SET company_id = (SELECT id from company ORDER BY company_name asc LIMIT 1)
WHERE id = $1;