import forgotPasswordPage from '../support/pages/forgotPasswordPage';

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

    // Click on the 'Forgot password?' link to navigate to the reset password page
    cy.get('a[href="/forgot-password"]').click();
  });

  it('should load the correct page with the correct title', () => {
    // Verify the page contains the correct title text
    cy.get('h1').should('have.text', 'Reset Password');
  });
  
  
  it('should display an error message for incorrect email', function () {
    cy.fixture('users').then((users) => {
      const invalidEmail = users.invalidEmail;
      forgotPasswordPage.fillEmail(invalidEmail);
   
      forgotPasswordPage.submitResetPassword();

      // Use POM to verify the error message
      forgotPasswordPage.showErrorMessage('Please enter a valid email');
    });
  });
  
  it('should display an error message for empty email', function () {
   
   
      forgotPasswordPage.submitResetPassword();

      // Use POM to verify the error message
      forgotPasswordPage.showErrorMessage('This field is mandatory');
    });
  


  it('should navigate back to the login page when clicking the "Return to login page" link', () => {
    // Click the "Return to login page" link
    forgotPasswordPage.click(forgotPasswordPage.returnToLoginLink);
    // Verify the URL after clicking the link
    forgotPasswordPage.verifyRedirection('/login');
  });
});
