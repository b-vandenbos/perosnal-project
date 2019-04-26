INSERT INTO suggested (
    company_id,
    user_id,
    q_id,
    q_dimension_id,
    q_text,
    q_category
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
);

SELECT suggested.id, suggested.company_id, user_id, q_id, q_dimension_id, q_text, q_category, q_dimension FROM suggested 
JOIN dimension ON dimension.id = suggested.q_dimension_id
WHERE suggested.company_id = $1;