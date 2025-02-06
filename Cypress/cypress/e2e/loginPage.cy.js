import loginPage from '../support/pages/loginPage';

describe('Login UI Test on https://client.amega.finance/login', () => {

  beforeEach(() => {
    // Clear cookies and local storage before each test
    
      cy.clearCookies();
      cy.clearLocalStorage();
      
      loginPage.visit();

   
    // Intercept the login API request
    cy.intercept('POST', 'https://client.amega.finance/client-api/login').as('loginRequest');

    
  });


  it('should log in successfully with valid credentials', function () {
    cy.fixture('users').then((users) => {
      const validUser = users.validUser;
      
      if (!Cypress.env('authToken')) {
        cy.login(validUser);  
      }

      // Use POM to verify redirection to the home page
      loginPage.verifyRedirection('/');
    });
  });

  

  it('should display an error message for invalid credentials', function () {
    cy.fixture('users').then((users) => {
      const invalidUser = users.invalidUser;

        

            // Use POM to fill out the login form with invalid credentials
        loginPage.fillEmail(invalidUser.email);
        loginPage.fillPassword(invalidUser.password);
        loginPage.submit();

      // Wait for the login request to complete
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(401);
      });

      // Use POM to verify the error message
      loginPage.showErrorMessage('Incorrect email or password');
    });
  });

  it('should display an error message for empty fields', function () {
    loginPage.submit();

    // Verify the error messages
    loginPage.showErrorMessage('This field is mandatory');
    loginPage.showErrorMessage('This field is mandatory');
  });

  it('should display an error message for incorrect email', function () {
    cy.fixture('users').then((users) => {
      const invalidEmail = users.invalidEmail;

      // Use POM to fill out the login form with incorrect email
      loginPage.fillEmail(invalidEmail);
      loginPage.fillPassword('Test@1234');
      loginPage.submit();

      // Use POM to verify the error message
      loginPage.showErrorMessage('Please enter a valid email');
    });
  });
  

  it('should visit the login page and click on the forgot password link', () => {
    loginPage.visit();
    loginPage.click(loginPage.forgetpasswordlink);  // Click the forgot password link
    loginPage.verifyRedirection('/forgot-password');
  
  });
});
