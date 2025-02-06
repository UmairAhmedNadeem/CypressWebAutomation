class hub {

    get hubButton() {
        return cy.get('#button-hub');
      }
    
      get signOutButton() {
        return cy.get('button.sc-f4051f19-0.eGuSkL');
      }
    

    clickHubButton() {
        this.hubButton.should('be.visible').click();
      }
    
     
      signOutFromHub() {
        this.clickHubButton();  // Navigate to Hub page
        this.signOutButton.should('be.visible').click();  // Click on the Sign Out button
      }
}