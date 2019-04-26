UPDATE survey
    SET index = (index + $1)
        WHERE id = $2
        AND company_id = $4
        AND $3 !=(SELECT min(index) FROM survey WHERE q_dimension_id = $5);

UPDATE survey
    SET index = $3
    WHERE id != $2 AND index = ($3 + $1) AND q_dimension_id = $5;

SELECT survey.id, survey.index, q_id, q_text, q_category, q_dimension, q_dimension_id, survey.company_id
FROM survey
JOIN dimension ON dimension.id = survey.q_dimension_id
WHERE survey.company_id = $4
ORDER BY dimension.index asc, survey.index asc;