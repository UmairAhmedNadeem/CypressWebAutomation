describe('User Registration UI Test on https://client.amega.finance/register', () => {

  // Constants
  const validUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'take124@example.com',
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
  };

  const invalidUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'taken.emailexample.com',
    password: 'SecurePass123!',
    invalidpassword: 'secureass1',
  };

  const submitButtonSelector = 'input[data-testid="test-submit"]';
  const acceptButtonSelector = '#onetrust-accept-btn-handler';

  beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies();
    cy.clearLocalStorage();

    // Intercept and block unnecessary requests (e.g., POST and GET requests for tracking)
     // Intercept and block unnecessary requests
     cy.intercept('POST', 'https://analytics.google.com/g/collect*').as('blockGoogleAnalytics');
     cy.intercept('POST', 'https://cp.pushwoosh.com/json/1.3/getConfig').as('blockPushwooshConfig');
     cy.intercept('GET', 'https://code.gist.build/renderer/0.4.5/assets/FontManifest.json').as('blockFontManifest');
     cy.intercept('GET', 'https://engine-consumer-api.cloud.gist.build/api/v2/configuration*').as('blockGistConfig');
 
     cy.intercept('PUT', 'https://my.amega.finance/client-api/registration').as('registrationRequest');
    
    // Disable the cookie consent widget by clicking "Accept" or blocking the request that triggers it
    cy.visit('https://client.amega.finance/register');
    cy.get('#onetrust-accept-btn-handler', { timeout: 20000 })
      .should('be.visible')  // Ensure the cookie consent button is visible
      .click({ force: true });  // Click "Accept" button to dismiss the widget

    // Optionally, you can intercept the request related to the cookie banner and block it
    cy.intercept('POST', '**/cookie-consent**').as('cookieConsentRequest');
  
  });


  it('should show an error if email is not valid ', () => {
    // Fill out the registration form with the already taken email
    cy.get('form').find('[name="firstName"]').type(invalidUser.firstName);
    cy.get('form').find('[name="lastName"]').type(invalidUser.lastName);
    cy.get('form').find('[name="email"]').type(invalidUser.email);
    cy.get('form').find('[name="password"]').type(invalidUser.password);
   
    // Submit the registration form
    cy.get(submitButtonSelector).click();

    // Assert that an error message is displayed for the email already being taken
    cy.contains('p', 'Please enter a valid email', { timeout: 10000 }).should('be.visible');
  });

  it('should show an error if required fields are missing', () => {
    // Leave the name field blank
    cy.get('form').find('[name="email"]').type(validUser.email);
    
    // Submit the registration form
    cy.get(submitButtonSelector).click();

    // Assert that the appropriate error message for the missing name field is shown
    cy.contains('p', 'This field is mandatory', { timeout: 10000 }).should('be.visible');
  });

  it('should show an error if the email field is missing', () => {
    // Leave the email field blank
    cy.get('form').find('[name="firstName"]').type(validUser.firstName);
    cy.get('form').find('[name="lastName"]').type(validUser.lastName);
    cy.get('form').find('[name="password"]').type(validUser.password);
    

    // Submit the registration form
    cy.get(submitButtonSelector).click();

    // Assert that the appropriate error message for the missing email field is shown
    cy.contains('This field is mandatory').should('be.visible');
  });

  it('should show an error if the password field is missing', () => {
    // Leave the password field blank
    cy.get('form').find('[name="firstName"]').type(validUser.firstName);
    cy.get('form').find('[name="lastName"]').type(validUser.lastName);
    cy.get('form').find('[name="email"]').type(validUser.email);
  

    // Submit the registration form
    cy.get(submitButtonSelector).click();

    // Assert that the appropriate error message for the missing password field is shown
    cy.contains('p', 'This field is mandatory', { timeout: 10000 }).should('be.visible');
  });

  
  it('should show an error if the password is not strong enough', () => {
    // Leave the password field blank
    cy.get('form').find('[name="firstName"]').type(validUser.firstName);
    cy.get('form').find('[name="lastName"]').type(validUser.lastName);
    cy.get('form').find('[name="email"]').type(validUser.email);
    cy.get('form').find('[name="password"]').type(invalidUser.invalidpassword);

    // Submit the registration form
    cy.get(submitButtonSelector).click();

    // Assert that the appropriate error message for the missing password field is shown
    cy.contains('p', 'Please enter a stronger password', { timeout: 10000 }).should('be.visible');
  });

it('should verify that email id is already taken', () => {
  // Fill out the registration form with valid data
  cy.get('form').find('[name="firstName"]').type(validUser.firstName);  // First Name
  cy.get('form').find('[name="lastName"]').type(validUser.lastName);   // Last Name
  cy.get('form').find('[name="email"]').type(validUser.email);         // Email field
  cy.get('form').find('[name="password"]').type(validUser.password);    // Password field
  
  // Intercept the registration request and set an alias
  cy.intercept('POST', '/register').as('registrationRequest'); // Adjust URL to match your registration endpoint

  // Submit the registration form using the submit button
  cy.get(submitButtonSelector).click();

  // Wait for the registration request response
  cy.wait('@registrationRequest').then((interception) => {
    if (interception.response.statusCode === 200) {
      // Success case: store sessionId and authToken
      const sessionId = interception.response.body.sessionId; // Adjust key if needed
      const authToken = interception.response.body.token; // Adjust key if needed

      // Log the session ID and auth token for debugging
      cy.log(`Session ID: ${sessionId}`);
      cy.log(`Auth Token: ${authToken}`);

      // You can store these in Cypress environment variables or localStorage if you need them for further tests
      Cypress.env('sessionId', sessionId);
      Cypress.env('authToken', authToken);

    } else if (interception.response.statusCode === 400) {
      // Error case: verify the validation message (email already taken)
      cy.contains('p', 'This email is already registered, please login', { timeout: 10000 }).should('be.visible');
    }
  });
});




});
