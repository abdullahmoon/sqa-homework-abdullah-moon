describe('Permission public agent', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Accept All')
      .should('be.visible')
      .click();
  });

  it('returns a valid response for "What is Permission?"', () => {

    cy.get('[data-testid="agent-chat-input"]')
      .should('be.visible')
      .type('What is Permission?');

    cy.get('[data-testid="agent-chat-input-send-button"]')
      .should('be.visible')
      .click();

    let responseSelector = '.justify-start';

    cy.get(responseSelector).should('not.be.empty')
      .invoke('text')
      .then((text) => {

        const response = text.trim();

        // Basic deterministic checks
        expect(response).to.not.be.empty;
        expect(response.length).to.be.greaterThan(40);

        expect(response.toLowerCase())
          .to.not.include('something went wrong');

        expect(response.toLowerCase())
          .to.not.include('error');

        cy.task('evaluatePermissionResponse', response)
          .then((result) => {
            expect(
              result.pass,
              result.reason
            ).to.eq(true);
          });
      });
  });



});




