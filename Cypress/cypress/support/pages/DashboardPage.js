class DashboardPage {
  get welcomeMessage() {
    return cy.get('h3.sc-4b72d8c5-2', { timeout: 10000 });
  }

  get walletSection() {
    return cy.get('section#section-wallets');
  }

  get completeVerificationLink() {
    return cy.get('a[href="/verify-profile"]');
  }

  get walletDepositButton() {
    return cy.get('#button-wallet-deposit');
  }

  get walletWithdrawButton() {
    return cy.get('#button-wallet-withdraw');
  }

  get walletTransferButton() {
    return cy.get('#button-wallet-transfer');
  }

  get walletHistoryButton() {
    return cy.get('#button-wallet-history');
  }

  get swiperBanner() {
    return cy.get('.swiper');
  }

  get cashbackSection() {
    return cy.get('a[href="/cashback"]');
  }

  get accountSection() {
    return cy.get('section#section-account');
  }

  get homeButton() {
    return cy.get('#button-home');
  }

  get cashbackButton() {
    return cy.get('#button-cashback');
  }

  get hubButton() {
    return cy.get('#button-hub');
  }

  // Get the Sign Out button (on the Hub page)
  get signOutButton() {
    return cy.get('button.sc-f4051f19-0.eGuSkL'); // targeting the button with class
  }

  verifyWelcomeMessage() {
    this.welcomeMessage.should('be.visible').and('contain.text', 'Welcome to Amega!');
  }

  verifyWalletSection() {
    this.walletSection.should('be.visible');
  }

  clickCompleteVerification() {
    this.completeVerificationLink.click();
  }

  clickDeposit() {
    this.walletDepositButton.should('be.visible').click();
  }

  clickWithdraw() {
    this.walletWithdrawButton.should('be.visible').click();
  }

  clickTransfer() {
    this.walletTransferButton.should('be.visible').click();
  }

  clickHistory() {
    this.walletHistoryButton.should('be.visible').click();
  }

  verifySwiperBanner() {
    this.swiperBanner.should('be.visible');
  }

  verifyCashbackSection() {
    this.cashbackSection.should('be.visible');
  }

  verifyAccountSection() {
    this.accountSection.should('be.visible');
  }

  clickHomeButton() {
    this.homeButton.should('be.visible').click();
  }

  clickCashbackButton() {
    this.cashbackButton.should('be.visible').click();
  }

  clickHubButton() {
    this.hubButton.should('be.visible').click();
  }

  // Method to log out (click Sign Out)
  logOut() {
    this.signOutButton.should('be.visible').click();
  }

  verifyRedirection(path) {
    cy.url().should('eq', Cypress.config('baseUrl') + path);
  }
}

export default new DashboardPage();
