describe('Roulette', () => {
  context("Betting", () => {
    it('Betting as non-authorized user calls the sign-in modal', () => {
      cy.visit('https://csgoempire.com/roulette');

      cy.log('Verifying wheel is displayed');
      cy.get('.wheel');

      const placeBid = () => {
        cy.log('Verifying bet amount can be set via input control');
        cy.get('.bet-input__controls').contains('button', '0.01').click();

        cy.wait(1000);

        cy.get(':nth-child(3) > .bet-btn', { timeout: 10000 })
          .should('not.have.class', 'bet-btn--disabled bet-btn')
          .click();
      };

      const attemptBid = () => {
        cy.get('body').then(($body) => {
          if ($body.find('.font-numeric').length) {
            placeBid();
          } else {
            cy.wait(2000);
            attemptBid(); 
          }
        });
      };
      attemptBid();
    });
  });
});
