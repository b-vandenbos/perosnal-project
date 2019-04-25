DELETE FROM discussion WHERE company_id = $1;

DELETE FROM suggested WHERE company_id = $1;

DELETE FROM survey WHERE company_id = $1;

DELETE FROM dimension WHERE company_id = $1;

DELETE FROM users WHERE delete_id = $1;

DELETE FROM company WHERE id = $1;
