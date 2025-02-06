

const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
	  
	  baseUrl: 'https://client.amega.finance',
    
    setupNodeEvents(on, config) {
            
      // implement node event listeners here
    },
  },
});
