# CSGO EMPIRE QA Engineer Roulette assessment
I believe that one of the most important skills of a QA Engineer is the ability to ask the right questions. However, for the sake of saving time, I decided to make some assumptions instead, keeping in mind that the goal of this assignment is to check my thought process during test analysis/design.

## Assumptions
- I have access to a dedicated testing environment and account with betting coins.
- I trust the RNG algorithm and will only perform a quick empirical black-box test for randomness. 
- Automated test that I wrote is for non-authorized user (expecting a sign-in modal after placing a bet), though I tried the roulette myself with personal Steam account (sold one of my CS2 cases).
- Automated test could be flaky just like any other frontend e2e written without proper selectors (they're really mess now)

## Out of Scope
- Sign-up process.
- Deposit and Steam trade-related flows
- Leveling
- Chat and rooms.
- WebSocket API integration tests (will only verify it's initialized and posts the right message when I make the bet). 
I think the WebSocket layer has to be covered with integrated tests.

## Test Plan
Approach: I will start from smoke to regression (and from positive to negative tests).

### 1. Smoke Tests

**1.1. Visual validation of all roulette page elements:**
- Wheel and CT/T/Bonus items.
- Pre-rolling timer enabled every 15 seconds.
- Bet amount input
- Pre-defined betting controls (0.01, 0.1, 1, 10, 100, 1/2, x2, MAX).
- Previous and Last 100 Rolls sections.
- “Place bet” panels: CT/T - x2, Bonus - x14.
- “Place bet” panels are enabled only during the pre-rolling.
- Place bet panels are disabled at the rolling phase
- Chat sidebar.
- Daily Roulette Race table.
- Header.
- Navbar
- Footer.
  
**1.2. Betting Flow/*:**
*This scenario is e2e and verifies multiple things, it will also be executed with just 1 active user for the speed and the ease of verification.

1) Login, deposit.
2) Input the valid bet amount (< than your deposit) using pre-defined controls.
3) Place a bet for any T/CT/Bonus, verifying the ‘Place bet’ panel is enabled only before rolling.
*Expected result*:
- Placing a bet is only enabled during pre-rolling (15 sec).
- Placing a bet increments the total for the corresponding table.
- Name of the user and bet sum are added to the corresponding table.
- Placing a bet decrements your deposit.
- Placing a bet sends the valid WebSocket message with all the necessary info about the bet/bidder.
4) Wait for the bet result.
*Expected result*:
- For win: deposit is incremented x2 or x14, depending on the bet; the sound of the cashier is played.
- For loss: deposit is decremented for the lost bet value.
- The corresponding image is added to the previous rolls section.
- The corresponding counter is incremented in the Last 100 section.

### 2. Regression*
2.0. More thorough testing of the RNG algorithm on both small and large 
2.1. Placing a winning bet on x2 (T/CT).
2.2. Placing a winning bet on x2 (T/CT).
2.3. Placing a winning bet on x14 (Bonus).
2.4. The winning user is displayed in the Daily Roulette Race table.
2.5. The Daily Roulette Race table updates.
2.6. Input the bet amount:
- via each of the bet input controls – "+", "x", "/", "MAX", "Clear".
- manually typing common bet amounts – ranges like 3-5, 10-30, 100-300.
- boundary values: 100 000; 100 001; 99 999; 9999999999.
2.7. Trying to bet over the limit with manual inputs + controls.
2.8. Test with a disabled internet connection:
  - during the betting process.
  - after placing a bet.
2.9. Exploring other edge cases like last-second bets.

* I would also test the roulette's responsiveness and adaptiveness for different screen sizes and devices.

### Stability and Performance
- Assessing performance with a normal number of users, around 100.
- Evaluating the system under high load, with user numbers like 10,000.

### Securtiy
Security checks for potential vulnerabilities (injections at the frontend/API level).

### Automated scenario
I wrote a basic e2e test for the betting flow of a non-authorized user with Cypress, including a few assertions for the presence of different roulette page elements (check logging).

How to run: 
1. Clone the project.
2. `npm i`
3. `npx open cypress` 
4. Proceed through Cypress interface: `E2E Testing -> Choose Browser, click Start E2E Testing in <Browser> -> Specs -> roulette.cy.js`

## If I had more time
I'd hop on a call with the dev/product teams to discuss:
- The current QA approach to manual/automation testing.
- How the RNG works and if it's being tested at all.
- Integration tests for the WebSocket engine.
- Strategies for stability and performance testing.
- Adding proper selectors for easier automation.
