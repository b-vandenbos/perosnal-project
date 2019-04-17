INSERT INTO survey (
    company_id,
    user_id,
    q_id,
    q_dimension_id,
    q_text,
    q_category,
    index
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    ((SELECT max(index) FROM survey WHERE company_id = $1) + 1)
);

SELECT * from survey where company_id = $1;