UPDATE dimension
SET index = $3
WHERE id = $2
    AND company_id = $1;