UPDATE company
SET company_name = $2,
    company_logo = $3
WHERE id = $1;

SELECT * FROM company
ORDER BY company_name asc;

