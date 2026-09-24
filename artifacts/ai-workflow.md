I used AI to help draft Cypress tests, assertions, and SQL queries. I reviewed and updated all generated content based on the actual Permission application.

AI sometimes suggested incorrect or unstable selectors, including IDs, text-based selectors, and generic input selectors. I inspected the actual DOM and replaced them with suitable selectors from the application.

AI also suggested fixed waits inside some tests. I removed these waits and configured the required timeouts in `cypress.config.js`, allowing Cypress to retry assertions instead of waiting for a fixed time.

I manually verified selectors, selected the final test scenarios, tested the actual application flows, and reviewed desktop and mobile behavior. AI was used as a supporting tool, while final testing decisions and verification were done manually.