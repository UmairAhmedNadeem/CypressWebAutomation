describe('Forgot Password Page Tests', () => {
  
    before(() => {
      // Visit the login page
      cy.visit('https://client.amega.finance/login');
      
      // Click on the 'Forgot password?' link to navigate to the reset password page
      cy.get('a[href="/forgot-password"]').click();
    });
  
    it('should load the correct page with the correct title', () => {
      // Verify the page contains the correct title text
      cy.get('h1').should('have.text', 'Reset Password');
    });
  
    it('should display the correct input fields', () => {
      // Verify that the email input field is present
      cy.get('input[type="email"]').should('be.visible');
      
      // Verify the "Reset Password" button is visible
      cy.get('input[type="submit"]').should('have.value', 'Reset Password');
      
      // Verify the description text
      cy.get('.sc-4b72d8c5-8').should('contain.text', 'We will send a reset link to your email address');
    });
  
    it('should have the correct logo and return to login link', () => {
      // Verify the logo is present
      cy.get('a[href="/"] svg').should('be.visible');
      
      // Verify the "Return to login page" link
      cy.get('a[href="/login"]').should('have.text', 'Return to login page');
    });
  
    it('should navigate back to the login page when clicking the "Return to login page" link', () => {
      // Click the "Return to login page" link
      cy.get('a[href="/login"]').click();
      
      // Verify the URL after clicking the link
      cy.url().should('eq', 'https://client.amega.finance/login');
    });
  
  });
  