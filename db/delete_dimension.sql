DELETE FROM survey
    WHERE q_dimension_id = $1
    AND company_id = $2;

DELETE FROM suggested
    WHERE q_dimension_id = $1
    AND company_id = $2;

DELETE FROM dimension
    WHERE id = $1
    AND company_id = $2;

SELECT * FROM dimension
    WHERE company_id = $2;