describe('Forgot Password Page Tests', () => {
  
  const acceptButtonSelector = '#onetrust-accept-btn-handler';
  beforeEach(() => {

    cy.clearCookies();
    cy.clearLocalStorage();
    // Visit the login page
    cy.visit('https://client.amega.finance/login');
    cy.get(acceptButtonSelector, { timeout: 20000 })
      .should('be.visible') // Ensure the cookie consent button is visible
      .click({ force: true }); // Click "Accept" button to dismiss the widget
   
   
    
    cy.get('h1').should('have.text', 'Sign in to Amega');
    cy.get('a[href="/forgot-password"]').click();
  
  });
    // Click on the 'Forgot password?' link to navigate to the reset password page
    

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
