INSERT INTO dimension (
    company_id,
    index,
    q_dimension
) VALUES (
    $1,
    ((SELECT max(index) FROM dimension WHERE company_id = $1) + 1),
    $2
);

SELECT * from dimension
WHERE company_id = $1
ORDER BY index asc;