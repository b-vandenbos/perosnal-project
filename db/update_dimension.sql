UPDATE dimension
SET q_dimension = $3
WHERE id = $1;

SELECT * from dimension
WHERE company_id = $2
ORDER BY index asc;