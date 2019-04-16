INSERT INTO discussion (
    company_id,
    user_id,
    message,
    message_date,
    message_time
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
);