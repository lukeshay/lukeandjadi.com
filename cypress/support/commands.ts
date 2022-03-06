Cypress.Commands.add('getById', (id: string) => cy.get(`[id="${id}"]`));

Cypress.Commands.add('getByTestId', (testId: string) => cy.get(`[data-test-id="${testId}"]`));

Cypress.Commands.add('getSubmitButton', () => cy.get('button[type=submit]'));

Cypress.Commands.add('visitRSVPSearchPage', () => {
  cy.visit('/rsvp');

  cy.scrollTo('top');

  cy.contains(
    'Please search for your name as it appears on your invite! Email contact@lukeandjadi.com if you have any questions.',
  );
});

Cypress.Commands.add('searchRSVP', (name: string) => {
  cy.getById('name').type(name);
  cy.scrollTo('top');

  cy.getSubmitButton().click({ waitForAnimations: true });
  cy.scrollTo('top');

  cy.wait(3000);
});
