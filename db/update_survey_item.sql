UPDATE survey
SET q_id = $2,
    q_dimension_id = $3,
    q_text = $4,
    q_category = $5
WHERE id = $1;