DELETE FROM company
WHERE id = $1;

DELETE FROM survey
WHERE survey.company_id = $1;

DELETE FROM discussion
WHERE discussion.company_id = $1;

DELETE FROM suggested
WHERE suggested.company_id = $1;

DELETE FROM dimension
WHERE dimension.company_id = $1;

DELETE FROM users
WHERE users.delete_id = $1;