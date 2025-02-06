

Cypress.Commands.add('login', (userKey) => {
  // Fetch user data from fixture
  cy.fixture('users').then((users) => {
    const user = users[userKey]; 
    cy.intercept('POST', '**/client-api/login').as('loginRequest'); // Alias the login request

    cy.visit('/login');
  
    
    // Accept the cookie consent banner
    cy.get('#onetrust-accept-btn-handler', { timeout: 10000 })
      .should('be.visible') 
      .click({ force: true });

    // Fill in the login form with the user's credentials
    cy.get('[name="email"]').type(user.email);
    cy.get('[name="password"]').type(user.password);

    // Submit the login form
    cy.get('input[data-testid="test-submit"]').click();

    // Intercept the login API request and validate the response
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);

      const sessionId = interception.response.body.sessionId;
      const authToken = interception.response.body.token;

      // Store the session ID and auth token for future requests
      Cypress.env('sessionId', sessionId);
      Cypress.env('authToken', authToken);
    });

    // Ensure the user is redirected to the home page
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });
});


Cypress.Commands.add('saveSession', () => {
  cy.getCookies().then((cookies) => {
    window.localStorage.setItem('cypressCookies', JSON.stringify(cookies));
  });

  // Optionally, you could store localStorage items here as well
  // For example, saving a session token:
  // window.localStorage.setItem('sessionToken', JSON.stringify(someValue));
});


Cypress.Commands.add('restoreSession', () => {
  const cookies = JSON.parse(window.localStorage.getItem('cypressCookies'));

  if (cookies && cookies.length > 0) {
    // Restore cookies from the localStorage
    cookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value);
    });

   
  }

});

// Login Custom command end here
