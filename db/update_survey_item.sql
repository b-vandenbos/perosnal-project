UPDATE survey
SET q_id = $2,
    q_dimension_id = $3,
    q_text = $4,
    q_category = $5
WHERE id = $1;

SELECT survey.id, index, q_id, q_text, q_category, q_dimension, q_dimension_id, survey.company_id
FROM survey
JOIN dimension ON dimension.id = survey.q_dimension_id
WHERE survey.company_id = $6
ORDER BY index asc;