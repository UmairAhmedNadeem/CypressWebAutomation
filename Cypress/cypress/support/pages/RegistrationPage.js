class RegistrationPage {
  // Locators for the registration page
  get firstNameField() {
    return cy.get('[name="firstName"]');
  }

  get lastNameField() {
    return cy.get('[name="lastName"]');
  }

  get emailField() {
    return cy.get('[name="email"]');
  }

  get passwordField() {
    return cy.get('[name="password"]');
  }

  

  get submitButton() {
    return cy.get('input[data-testid="test-submit"]'); // Adjust if necessary
  }

  get errorMessage() {
    return cy.get('p'); // General locator for error messages
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

  get cookieAcceptButton() {
    return cy.get('#onetrust-accept-btn-handler'); // Accept cookie consent
  }

  // Methods for interacting with the page
  visit() {
    cy.visit(Cypress.config('baseUrl') + '/register');
  }

  fillForm(user) {
    this.firstNameField.clear().type(user.firstName);
    this.lastNameField.clear().type(user.lastName);
    this.emailField.clear().type(user.email);
    this.passwordField.clear().type(user.password);
    if (user.confirmPassword) {
      this.confirmPasswordField.clear().type(user.confirmPassword);
    }
  }
  

  submitForm() {
    this.submitButton.click();
  }

  verifyErrorMessage(message) {
    cy.contains('p', message, { timeout: 10000 }).should('be.visible');
  }

  submitForm() {
    this.submitButton.click(); 
  }

  clickCookieAcceptButton() {
    this.cookieAcceptButton.click({ force: true });
  }

  verifyRedirection(path) {
    cy.url().should('eq', Cypress.config('baseUrl') + path);
  }
}

export default new RegistrationPage();
