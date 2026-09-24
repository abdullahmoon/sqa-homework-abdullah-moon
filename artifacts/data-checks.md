Based on the agent and signup flows I tested, I would expect data to be stored for users, conversations, messages, and profile information.

When a user sends a message, I would expect a conversations record with fields such as id, user_id, and created_at. A messages table could contain id, conversation_id, role, content, and created_at. The role would help identify whether the message came from the user or the agent.

After signup, I would expect a users record containing id, email, email_verified, created_at, and updated_at. Profile information such as name, date of birth, and selected domains could either be stored on the user record or in a separate profiles table.

## SQL Queries

1. Confirm a new account has the expected data


SELECT id, email, email_verified, created_at
FROM users
WHERE email = 'abdullahmoon37@gmail.com';


I would check that the user exists, the email is correct, and the timestamps are populated.

2. Check that messages belong to a valid conversation


SELECT m.id, m.role, m.content, m.created_at
FROM messages m
JOIN conversations c
   ON m.conversation_id = c.id
WHERE c.id = 123
ORDER BY m.created_at;


This confirms that user and agent messages are connected to the expected conversation.

3. Find orphaned messages

SELECT m.id, m.conversation_id
FROM messages m
LEFT JOIN conversations c
    ON m.conversation_id = c.id
WHERE c.id IS NULL;

This should return no records.

## Pipeline Integrity

For analytics, I would add a check that rejects or flags messages with a missing conversation ID, empty content, invalid timestamps, or an unknown role. This prevents incomplete records from affecting reporting.