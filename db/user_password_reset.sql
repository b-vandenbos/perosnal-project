UPDATE users
SET 
    password = $1,
    passwordset = true
WHERE user_email = $2;

SELECT * FROM users WHERE user_email = $2;
