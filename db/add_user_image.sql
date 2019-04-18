UPDATE users
SET user_image = $1
WHERE id = $2;

SELECT * FROM users WHERE id = $2;