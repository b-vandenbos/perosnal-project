UPDATE dimension
    SET index = (index + $1)
        WHERE id = $2
        AND company_id = $4
        AND $3 !=(SELECT min(index) FROM dimension WHERE company_id = $4);

UPDATE dimension
    SET index = $3
        WHERE id != $2 AND index = ($3 + $1);

SELECT * from dimension
    WHERE company_id = $1
    ORDER BY dimension.index asc;