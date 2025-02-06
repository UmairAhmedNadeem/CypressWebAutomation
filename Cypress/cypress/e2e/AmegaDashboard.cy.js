describe('Amega Dashboard Tests with Login', () => {
  
    // Constants for login
    const validUser = {
      email: 'umair_ahmed_nadeem@hotmail.com',
      password: 'Test@1234',
    };
  
    const submitButtonSelector = 'input[data-testid="test-submit"]';
    const acceptButtonSelector = '#onetrust-accept-btn-handler';
    
    // Log in before each test
    beforeEach(() => {
      // Clear cookies and local storage before each test
      cy.clearCookies();
      cy.clearLocalStorage();
      
      // Intercept the login request
      cy.intercept('POST', 'https://client.amega.finance/client-api/login').as('loginRequest');
      
      // Visit login page
      cy.visit('https://client.amega.finance/login');
      
      // Accept cookies banner (if present)
      cy.get(acceptButtonSelector, { timeout: 20000 })
        .should('be.visible')
        .click({ force: true });
  
      // Fill out the login form with valid credentials
      cy.get('form').find('[name="email"]').type(validUser.email);
      cy.get('form').find('[name="password"]').type(validUser.password);
      cy.get(submitButtonSelector).click();
      
      // Wait for the login API request to complete and ensure login success
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);  // Ensure successful login
  
        const sessionId = interception.response.body.sessionId; // Extract session ID (adjust if needed)
        const authToken = interception.response.body.token; // Extract token (adjust if needed)
  
        // Store session ID and token for future use (optional)
        Cypress.env('sessionId', sessionId);
        Cypress.env('authToken', authToken);

        cy.get('h3.sc-4b72d8c5-2',{timeout :10000}).should('be.visible').and('contain.text', 'Welcome to Amega!');
      });
  
      // Ensure login success by verifying the redirection to the dashboard or home page
      cy.url().should('eq', 'https://client.amega.finance/');
    });
  
  
      
    it('should display the "Complete verification" link', () => {
      // Verify the "Complete verification" link is visible and clickable
      cy.get('a[href="/verify-profile"]').should('be.visible').and('contain.text', 'Complete verification').click();
      // Optionally, verify redirection
      cy.url().should('include', '/verify-profile');
    });
  
    it('should display wallet options', () => {
      // Verify wallet section is visible
      cy.get('section#section-wallets').should('be.visible');
      
      // Check if wallet balance is visible
      cy.get('.sc-89dd1afc-1.hKUMVr').should('be.visible').and('contain.text', 'Main wallet');
    });
  
    it('should display and click the "Deposit" button in the wallet section', () => {
        // Verify the "Withdraw" button is visible
        cy.get('#button-wallet-deposit', { timeout: 10000 }).should('be.visible')
          .and('contain.text', 'Deposit').click();
        
        // Optionally, verify redirection to the withdraw page
        cy.url().should('include', '/deposit');
      });
    it('should display and click the "Withdraw" button in the wallet section', () => {
        // Verify the "Withdraw" button is visible
        cy.get('#button-wallet-withdraw', { timeout: 10000 }).should('be.visible')
          .and('contain.text', 'Withdraw').click();
        
        // Optionally, verify redirection to the withdraw page
        cy.url().should('include', '/withdrawal');
      });
    
      it('should display and click the "Transfer" button in the wallet section', () => {
        // Verify the "Transfer" button is visible
        cy.get('#button-wallet-transfer', { timeout: 10000 }).should('be.visible')
          .and('contain.text', 'Transfer').click();
        
        // Optionally, verify redirection to the transfer page
        cy.url().should('include', '/transfer');
      });
    
      it('should display and click the "History" button in the wallet section', () => {
        // Verify the "History" button is visible
        cy.get('#button-wallet-history', { timeout: 10000 }).should('be.visible')
          .and('contain.text', 'History').click();
        
        // Optionally, verify redirection to the transaction history page
        cy.url().should('include', '/transaction-history');
      });


    it('should have a deposit button in the wallet section', () => {
      // Verify the deposit button in the wallet section
      cy.get('a#button-wallet-deposit')
        .should('be.visible')
        .and('contain.text', 'Deposit')
        .click();
      // Optionally, verify redirection
      cy.url().should('include', '/deposit');
    });
  
    it('should have the swiper banner visible', () => {
      // Verify the swiper (carousel) is present and contains slides
      cy.get('.swiper').should('be.visible');
      cy.get('.swiper-slide').should('have.length.greaterThan', 0);
    });
  
    it('should show the cashback section', () => {
      // Verify the cashback section
      cy.get('a[href="/cashback"]').should('be.visible');
      cy.get('span.sc-89dd1afc-1.hKUMVr').should('contain.text', 'Cashback');
    });
  
    it('should have a history button under wallet section', () => {
      // Verify the history button under the wallet section
      cy.get('a#button-wallet-history')
        .should('be.visible')
        .and('contain.text', 'History')
        .click();
      // Optionally, verify redirection
      cy.url().should('include', '/transaction-history');
    });
  
    it('should show account options', () => {
      // Verify the "My Accounts" section is visible
      cy.get('section#section-account').should('be.visible');
    });


    it('should click the "Home" button and redirect to the home page', () => {
        // Click the "Home" button
        cy.get('#button-home', { timeout: 10000 }).should('be.visible')
          .and('contain.text', 'Home').click();
        
        // Verify redirection to the home page
        cy.url().should('eq', 'https://client.amega.finance/');
      });

      it('should click the "Cashback" button and redirect to the cashback page', () => {
        // Click the "Cashback" button
        cy.get('#button-cashback', { timeout: 10000 }).should('be.visible')
          .and('contain.text', 'Cashback').click();
        
        // Optionally, verify redirection to the cashback page
        cy.url().should('include', '/cashback');
      });
    
    
      it('should click the "Hub" button and redirect to the hub page', () => {
        // Click the "Hub" button
        cy.get('#button-hub', { timeout: 10000 }).should('be.visible')
          .and('contain.text', 'Hub').click();
    });

    
});


