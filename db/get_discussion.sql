SELECT discussion.company_id, discussion.user_id, discussion.id, message, message_date, message_time, users.user_image
FROM discussion
JOIN users ON discussion.user_id = users.id
WHERE discussion.company_id = $1;