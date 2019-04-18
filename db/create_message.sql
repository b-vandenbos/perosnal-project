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

SELECT discussion.id, discussion.company_id, discussion.user_id, message, message_date, message_time, users.user_image FROM discussion
JOIN users ON users.id = discussion.user_id
WHERE discussion.company_id = $1;