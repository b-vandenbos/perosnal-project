UPDATE users
SET user_image = $1
WHERE id = $2;

select * from users where id = $2;