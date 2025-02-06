import registrationPage from '../support/pages/registrationPage';

describe('User Registration UI Test on https://client.amega.finance/register', () => {
  let users;

  before(() => {
    // Load the fixture data before running any tests
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies();
    cy.clearLocalStorage();

    // Visit the registration page and accept cookies
    registrationPage.visit();
    registrationPage.clickCookieAcceptButton();

    // Intercept and block unnecessary requests
    cy.intercept('POST', 'https://analytics.google.com/g/collect*').as('blockGoogleAnalytics');
    cy.intercept('POST', 'https://cp.pushwoosh.com/json/1.3/getConfig').as('blockPushwooshConfig');
    cy.intercept('GET', 'https://code.gist.build/renderer/0.4.5/assets/FontManifest.json').as('blockFontManifest');
    cy.intercept('GET', 'https://engine-consumer-api.cloud.gist.build/api/v2/configuration*').as('blockGistConfig');

    cy.intercept('PUT', 'https://my.amega.finance/client-api/registration').as('registrationRequest');
  });

  it('should show an error if email is not valid', () => {
    registrationPage.fillForm( {...users.validUser, email : users.InvalidEmail.email});
    registrationPage.submitForm();
    
    // Assert that an error message is displayed for invalid email
    registrationPage.verifyErrorMessage('Please enter a valid email');
  });


  it('should show an error if the password is not strong enough', () => {
    registrationPage.fillForm({ ...users.validUser, password: users.invalidUser.password });
    registrationPage.submitForm();

    // Assert that the error message for weak password is displayed
    registrationPage.verifyErrorMessage('Please enter a stronger password');
  });

  it('should verify that email id is already taken', () => {
    registrationPage.fillForm(users.validUser);
    
    // Intercept the registration request and set an alias
    cy.intercept('POST', '/register').as('registrationRequest');
    
    registrationPage.submitForm();

    cy.wait('@registrationRequest').then((interception) => {
      if (interception.response.statusCode === 200) {
        // Handle successful registration if needed
        const sessionId = interception.response.body.sessionId;
        const authToken = interception.response.body.token;
        cy.log(`Session ID: ${sessionId}`);
        cy.log(`Auth Token: ${authToken}`);
        Cypress.env('sessionId', sessionId);
        Cypress.env('authToken', authToken);
      } else if (interception.response.statusCode === 400) {
        // Error case: verify the validation message (email already taken)
        registrationPage.verifyErrorMessage('This email is already registered, please login');
      }
    });
  });

});
