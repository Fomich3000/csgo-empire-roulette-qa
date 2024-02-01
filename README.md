# CSGO EMPIRE QA Engineer Roulette assessment

I believe that one of the most important skills of good QA Engineer is the ability to communicate and ask the right questions. However for the time saving puprose I decided to make certain assumptions focusing on demonstrating my thought process during test analysis.

## Assumptions
- I have access to a dedicated testing environment and account with betting coins.
- I trust the RNG algorithm but will perform a quick emperical black-box test.
- Automated test that I wrote is for non-authorized user (expecting a sign-in modal), though I tried the roulette myself with personal Steam account (sold one of my CS2 cases)
- Automated test could be flaky just like any other frontend e2e written without proper selectors (they're really mess now)

## Out of Scope
- Sign-up process.
- Deposit and Steam trade-related flows
- Leveling
- Chat and rooms.
- WebSocket API integration tests (would only verify )

## Test Plan
### Smoke Tests
Starting with essential features to ensure they are functioning correctly.

- **Visual Checks:**
  - Examining the wheel, CT/T/Bonus items.
  - Ensuring the rolling timer is active every 15 seconds.
  - Reviewing the betting input and predefined controls.
  - Verifying the "Previous and Last 100 Rolls" sections.
  - Checking the activation and deactivation of bet panels.
  - Looking over the chat sidebar, Daily Roulette Race table, header, and footer.

- **Betting Flow:**
  - Testing login and credit deposit.
  - Exploring different bet inputs, and placing bets.
  - Monitoring the outcomes of bets, both wins and losses, and their reflection in the roll history.

### Additional Tests
- Each of the bet input controls – "+", "x", "/", "MAX", "Clear".
- Inputting common bet amounts – ranges like 3-5, 10-30, 100-300.
- Testing high-value bets – 100,000; 100,001; up to 9999999999.
- Attempting to exceed bet limits with manual and control inputs.
- Observing behavior during and after internet connection issues.

### Stability and Performance
- Assessing performance with an average number of users, around 100.
- Evaluating the system under high load, with user numbers like 10,000.

### Further Considerations
- More thorough testing of the RNG algorithm on both small and large scales.
- Checking adaptiveness and responsiveness across various devices and screen sizes.
- Security checks for potential vulnerabilities.
- Exploring edge cases like last-second bets.

### Automated test



## If I Had More Time
- I'd discuss with the dev and product teams about:
  - The integration tests for the WebSocket engine.
  - Strategies for stability and performance testing.
- Would request devs to add more specific selectors for easier automation.

