# UX Review

I reviewed Permission on desktop using Chrome and on mobile. I tested both the pre-login experience and the flow after creating an account.

## What Worked

The pre-login agent is simple and easy to understand. Suggested topics help users start a conversation without having to think of a question. The signup flow is also straightforward when all information is entered correctly.

## What Felt Rough

I found more issues during signup and profile completion than on the pre-login agent. Most of them are related to navigation and form validation. On mobile, I also found different behavior when opening the email app.

## Prioritized Improvements

### 1. Email Verification Page Has No Recovery Path

Observation: On `/verify-email`, if a user enters a misspelled email during signup, there is no clear way to return to signup or login. Clicking the Permission logo or using the browser back button does not provide a useful recovery path.

Why it matters: The user can get stuck and may not be able to complete signup.

Change: Add clear “Change email” and “Back to login” options.

### 2. Missing Profile Field Validation

Observation: On `/profile/complete`, fields do not have enough validation. For example, I was able to enter a future date as the date of birth.

Why it matters: Invalid user information can be saved and affect data quality.

Change: Add field-level validation and prevent future dates for date of birth.

### 3. Required and Optional Fields Are Not Clear

Observation: The profile completion page does not clearly show which fields are required and which are optional.

Why it matters: Users may not know what they must complete before continuing.

Change: Clearly mark required fields and identify optional fields.

### 4. Mobile Email Action Opens Compose

Observation: On mobile, the “Open Email App” action opens the mail application but also starts a new email instead of taking the user to their inbox.

Why it matters: This is confusing when the user is trying to find the verification email.

Change: Open the inbox where possible, or provide clearer instructions for checking the verification email.

### 5. Browser Back Navigation

Observation: After moving further through the post-signup flow, the browser back button can navigate the user back to `/domains`.

Why it matters: It can return the user to an earlier onboarding step and make the current state unclear.

Change: Handle completed onboarding steps correctly and redirect users to the appropriate current step.