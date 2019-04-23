INSERT INTO company (
    company_name
) VALUES (
    $1
)

RETURNING id;