DELETE FROM suggested
WHERE suggested.id = $1;

SELECT suggested.id, suggested.company_id, suggested.user_id, q_id, q_text, q_category, q_dimension, q_dimension_id
FROM suggested
JOIN dimension ON dimension.id = suggested.q_dimension_id
WHERE suggested.company_id = $2;