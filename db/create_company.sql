INSERT INTO company (
    company_name,
    company_logo
) VALUES (
    $1,
    $2
)

RETURNING id;