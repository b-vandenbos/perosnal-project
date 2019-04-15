SELECT survey.id, q_id, q_text, q_category, q_dimension, q_dimension_id
FROM survey
JOIN dimension ON dimension.id = survey.q_dimension_id;