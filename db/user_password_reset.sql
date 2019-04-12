UPDATE users
SET 
    password = $1,
    passwordset = true
WHERE user_email = $2;
