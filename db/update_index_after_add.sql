UPDATE survey 
    SET index = (index + 1)
WHERE company_id = $1 AND index >= $2 AND q_dimension_id != $3;

SELECT * FROM survey
WHERE company_id = $1
ORDER BY index asc;