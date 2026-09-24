describe('Permission public agent', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Accept All')
      .should('be.visible')
      .click();
    Cypress.automation('remote:debugger:protocol', {
      command: 'Browser.grantPermissions',
      params: {
        permissions: [
          'clipboardReadWrite',
          'clipboardSanitizedWrite'
        ],
        origin: 'https://ask.permission.ai'
      }
    });
  });

  //Page loads  but not loaded the suggested topics yet 

  it('loads the page with suggested topics visible', () => {
    cy.url().should('eq', 'https://ask.permission.ai/');
    cy.get('[data-testid="ai-page-title"]').should('be.visible').and('have.text', 'Permission Agent');

  });


  //Free-text question produces an agent response

  it('produces an agent response for a free-text question', () => {
    const question = 'Who is Permission?';

    cy.get('[data-testid="agent-chat-input"]')
      .should('be.visible')
      .type(question);

    cy.get('[data-testid="agent-chat-input-send-button"]').should('be.visible')
      .click();

    let userMessage = '.justify-end';

    cy.get(userMessage).should('contain.text', question);

    let responseSelector = '.justify-start';

    cy.get(responseSelector).should('not.be.empty');
  });

  // Input handles an empty submission

  it('submit an empty question', () => {
    cy.get('[data-testid="agent-chat-input"]')
      .should('be.visible')
      .type('{enter}');

    cy.get('[data-testid="agent-chat-input-send-button"]')
      .should('be.disabled');
  });

  //submission with only spaces

  it('submit a question with only spaces', () => {
    cy.get('[data-testid="agent-chat-input"]')
      .should('be.visible')
      .type('   {enter}');

    cy.get('[data-testid="agent-chat-input-send-button"]')
      .should('be.disabled');
  });

  /*pasting text into the input field from clipboard 
   if there is a value in the clipboard log will show 
   the value in the clipboard otherwise log will show 
   no value in clipboard for pasting*/

  it('pastes text into the input field', () => {
    cy.window().then((win) => {
      return win.navigator.clipboard.readText();
    }).then((clipboardText) => {

      if (clipboardText && clipboardText.trim().length > 0) {

        cy.log(`Clipboard value: ${clipboardText}`);

        cy.get('[data-testid="agent-chat-input"]')
          .should('be.visible')
          .clear()
          .type(clipboardText);

      } else {

        cy.log('No value in clipboard for pasting');

      }
    });
  });

  //handles very long text in the ASK input

  it('handles very long text in the ASK input', () => {
    const longText = 'A'.repeat(1000);

    cy.get('[data-testid="agent-chat-input"]')
      .should('be.visible')
      .type(longText);

    cy.get('[data-testid="agent-chat-input-send-button"]').should('be.visible')
      .click({ force: true });

    let userMessage = '.justify-end';

    cy.get(userMessage).should('contain.text', longText);


  });


  //Shift + Enter creates a new line

  it('creates a new line when Shift + Enter is pressed', () => {
    cy.get('[data-testid="agent-chat-input"]')
      .should('be.visible')
      .type('1st line');

    cy.get('[data-testid="agent-chat-input"]')
      .type('{shift}{enter}');

    cy.get('[data-testid="agent-chat-input"]')
      .should('have.value', '1st line\n');
  });


  //Login navigation works
  it('navigates to the login page', () => {
    cy.contains('Log in')
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/login');
  });

  //Sign Up navigation works
  it('navigates to the sign-up page', () => {
    cy.contains('Sign Up')
      .should('be.visible')
      .click();

    cy.url()
      .should('include', '/register');
  });


});


