SELECT * from dimension
WHERE company_id = $1
ORDER BY dimension.index asc;