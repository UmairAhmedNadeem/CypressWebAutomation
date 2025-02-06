// cypress/support/pages/forgotPasswordPage.js

class ForgotPasswordPage {
  // Locators for the forgot password page
  get emailField() {
    return cy.get('input[type="email"]'); // Locator for the email input field
  }

  get resetPasswordButton() {
    return cy.get('input[type="submit"]'); // Locator for the Reset Password button
  }

  get descriptionText() {
    return cy.get('.sc-4b72d8c5-8'); // Locator for the description text under the email field
  }

  get logo() {
    return cy.get('a[href="/"] svg'); // Locator for the logo (usually an SVG inside a link to the homepage)
  }

  get returnToLoginLink() {
    return cy.get('a[href="/login"]'); // Locator for the 'Return to login page' link
  }

  get forgotPasswordLink() {
    return cy.get('a[href="/forgot-password"]'); // Locator for the 'Forgot password?' link on the login page
  }

  // Methods for interacting with the page
  visit() {
    cy.visit(Cypress.config('baseUrl') + '/forgot-password'); // Visit the forgot password page
  }

  fillEmail(email) {
    this.emailField.clear().type(email); // Fill the email input field
  }

  submitResetPassword() {
    this.resetPasswordButton.click(); // Click the reset password button
  }

  verifyRedirection(path) {
    cy.url().should('eq', Cypress.config('baseUrl') + path); // Verify redirection after form submission
  }
  showErrorMessage(message) {
    cy.contains('p', message).should('be.visible');
  }

  click(element) {
    element.click();
  }
  clickReturnToLogin() {
    this.returnToLoginLink.click(); // Click on the 'Return to login page' link
  }
}

export default new ForgotPasswordPage();
