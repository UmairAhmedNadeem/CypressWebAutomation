import LoginPage from '../support/pages/LoginPage';
import DashboardPage from '../support/pages/DashboardPage';
import HubPage  from '../support/pages/HubPage';

describe('Amega Dashboard', () => {
  
   beforeEach(() => {
    
    cy.login('validloginuser');
    cy.clearCookies();
    cy.clearLocalStorage();
    
    DashboardPage.verifyWelcomeMessage();
  });

  it('should display the "Complete verification" link', () => {
    DashboardPage.clickCompleteVerification();
   
    
  });

  it('should display wallet options', () => {
    DashboardPage.verifyWalletSection();
    cy.get('.sc-89dd1afc-1.hKUMVr').should('be.visible').and('contain.text', 'Main wallet');
  });

  it('should display and click the "Deposit" button in the wallet section', () => {
    DashboardPage.clickDeposit();

    DashboardPage.verifyRedirection('/deposit');
    
  });

  it('should display and click the "Withdraw" button in the wallet section', () => {
    DashboardPage.clickWithdraw();
    DashboardPage.verifyRedirection('/withdrawal');
  });

  it('should display and click the "Transfer" button in the wallet section', () => {
    DashboardPage.clickTransfer();
    DashboardPage.verifyRedirection('/transfer');
  
  });

  it('should display and click the "History" button in the wallet section', () => {
    DashboardPage.clickHistory();
    DashboardPage.verifyRedirection('/transaction-history');
    
  });

  it('should show the swiper banner', () => {
    DashboardPage.verifySwiperBanner();
  });

  it('should show the cashback section', () => {
    DashboardPage.verifyCashbackSection();
    cy.get('span.sc-89dd1afc-1.hKUMVr').should('contain.text', 'Cashback');
  });

  it('should have a history button under wallet section', () => {
    DashboardPage.clickHistory();
    DashboardPage.verifyRedirection('/transaction-history');
    
  });

  it('should show account options', () => {
    DashboardPage.verifyAccountSection();
  });

 

  it('should click the "Cashback" button and redirect to the cashback page', () => {
    DashboardPage.clickCashbackButton();
    DashboardPage.verifyRedirection('/cashback');
   
  });

  it('should click the "Hub" button and redirect to the hub page', () => {
    DashboardPage.clickHubButton();
    DashboardPage.verifyRedirection('/hub');
    HubPage.signOutFromHub();

  });


});
