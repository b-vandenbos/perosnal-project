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