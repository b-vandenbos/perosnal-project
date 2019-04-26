UPDATE survey 
    SET index = (index + 1)
WHERE company_id = $1 AND index >= $2 AND q_dimension_id != $3;

SELECT survey.id, survey.index, q_id, q_text, q_category, q_dimension, q_dimension_id, survey.company_id
FROM survey
JOIN dimension ON dimension.id = survey.q_dimension_id
WHERE survey.company_id = $1
ORDER BY dimension.index asc, survey.index asc;