class LoginPage {
  // Locators for the login page
  get emailField() {
    return cy.get('[name="email"]');
  }

  get passwordField() {
    return cy.get('[name="password"]');
  }

  get submitButton() {
    return cy.get('input[data-testid="test-submit"]');
  }

  get acceptButton() {
    return cy.get('#onetrust-accept-btn-handler');
  }

  get forgetpasswordlink(){
     return cy.get('a[href="/forgot-password"]');

  }

  // Methods for interacting with the page
  visit() {
    cy.visit('/login');
    
  }

  acceptCookies() {
    this.acceptButton.should('be.visible').click({ force: true });
  }

  fillEmail(email) {
    this.emailField.clear().type(email);
  }

  fillPassword(password) {
    this.passwordField.clear().type(password);
  }

  submit() {
    this.submitButton.click();
  }

  verifyRedirection(path) {
    cy.url().should('eq', Cypress.config('baseUrl') + path);
  }

  showErrorMessage(message) {
    cy.contains('p', message).should('be.visible');
  }

  
  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
  
  click(element) {
    element.click();
  }


}

export default new LoginPage();
