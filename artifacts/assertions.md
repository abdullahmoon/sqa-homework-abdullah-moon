I used the suggested topic “What is Permission?” because the answer can be different each time while still being correct.

I validate the response in two ways.

First, Cypress checks that the response appears, is not empty or too short, does not contain an obvious error, and has finished streaming.

I do not check the exact response text because the agent can give a valid answer using different words. Checking exact text would make the test unreliable.

Second, I use Promptfoo to check the meaning of the response. The response captured by Cypress is evaluated to make sure it actually explains what Permission is and what it does.

I chose Promptfoo because it works well with my JavaScript test setup and can check the quality of the answer instead of only checking text.

For example, a response could contain the word “Permission” and be long enough to pass a normal Cypress check, but still be unrelated to the question. Promptfoo helps catch this while still allowing different valid answers.