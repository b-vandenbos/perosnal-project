UPDATE survey 
    SET index = (index + 1)
WHERE company_id = $1 AND index >= $2 AND q_dimension_id != $3;

SELECT * FROM survey
JOIN dimension ON dimension.id = survey.q_dimension_id
WHERE company_id = $1
ORDER BY dimension.index asc, survey.index asc;