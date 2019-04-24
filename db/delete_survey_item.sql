DELETE FROM survey
WHERE id = $1;

UPDATE survey
    SET index = (index - 1)
WHERE survey.company_id = $2 AND index > $3;

SELECT survey.id, survey.index, q_id, q_text, q_category, q_dimension, q_dimension_id, survey.company_id
FROM survey
JOIN dimension ON dimension.id = survey.q_dimension_id
WHERE survey.company_id = $2
ORDER BY survey.index asc;