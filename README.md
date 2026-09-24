# Permission Agent --- QA Take-Home Challenge

This repository contains my Senior Quality Assurance Engineer take-home
submission for the Permission public pre-login agent at
`ask.permission.ai`.

## Setup

### Prerequisites

-   Node.js
-   npm

### Install dependencies

``` bash
git clone <YOUR-PUBLIC-GITHUB-REPO-URL>
cd sqa-homework-abdullah-moon
npm install
```

### Run the test suite

``` bash
npx cypress run
```

### Open Cypress locally

``` bash
npx cypress open
```

The generated test report is stored in `artifacts/report/`.

## Test Strategy (TL;DR)

I kept the suite to 6 focused tests instead of filling the 8-test limit.
The tests cover suggested topics, a suggested-topic agent response, a
free-text agent response, Shift+Enter behavior, input validation, and
the main experience at a mobile viewport. I focused on the public
pre-login flow because that is the required automation scope.
Post-signup behavior was reviewed manually as part of the UX review. AI
responses are not checked against exact text because the response
content and timing can change between runs.

## Key Decisions

-   I used Cypress because it fits the small browser-focused scope and
    provides automatic retrying for asynchronous UI behavior.
-   I used selectors verified against the actual page instead of relying
    on generated IDs, CSS classes, or assumed selectors.
-   I prefer stable `data-testid` and accessible selectors where they
    are available.
-   I avoided fixed `cy.wait()` calls for agent responses.
-   Cypress timeouts such as `defaultCommandTimeout` and
    `pageLoadTimeout` are configured in `cypress.config.js`.
-   AI responses are checked for valid returned content rather than
    exact wording.
-   Semantic response quality is covered separately by the LLM
    evaluation.
-   I kept the test structure lightweight rather than adding a
    page-object layer for test suite.

## Artifacts

-   [AI response assertions](artifacts/assertions.md)
-   [UX review](artifacts/ux-review.md)
-   [Data checks](artifacts/data-checks.md)
-   [AI workflow](artifacts/ai-workflow.md)
-   [Test report](artifacts/report/)
-   [Narrated demo](artifacts/demo.mp4)

## AI Disclosure

AI usage, corrections, and manually verified work are documented in
[artifacts/ai-workflow.md](artifacts/ai-workflow.md).


## Submission Checklist

-   [ ] Repo named `sqa-homework-<first-last>` and default branch is
    `main`
-   [ ] Submitted as a **new email** with subject **"Senior Quality
    Assurance Engineer -- Take-Home Submission"**
-   [ ] README includes exact Setup + run commands (verified from a
    clean clone)
-   [ ] README word count ≤ 500 (excluding commands/checkboxes)
-   [ ] Max 8 tests; all 4 required behaviors covered
-   [ ] `artifacts/assertions.md` included (≤ 300 words)
-   [ ] At least one assertion wired into an LLM-evaluation framework
    and running as part of the suite
-   [ ] `artifacts/ux-review.md` included (≤ 400 words, desktop +
    mobile, post-signup exploration, 3--5 prioritized improvements)
-   [ ] `artifacts/data-checks.md` included (≤ 300 words + SQL: expected
    data, verification queries, one pipeline integrity check)
-   [ ] `artifacts/ai-workflow.md` included (≤ 300 words, all 4
    questions answered)
-   [ ] `artifacts/report/` included (or hosted link + screenshot)
-   [ ] `artifacts/demo.mp4` included (60--90 sec, narrated: suite +
    report + one Part 2 assertion explained)
-   [ ] Commit history shows how the work evolved
